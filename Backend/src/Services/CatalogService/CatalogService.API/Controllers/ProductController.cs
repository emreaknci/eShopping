using CatalogService.API.Context;
using CatalogService.API.Dtos.ForCategory;
using CatalogService.API.Dtos.ForProduct;
using CatalogService.API.Models;
using CatalogService.API.Utils.Helpers;
using CatalogService.API.Utils.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CatalogService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly CatalogDbContext _catalogContext;

        public ProductController(CatalogDbContext catalogContext)
        {
            _catalogContext = catalogContext;
        }

        [HttpGet]
        public IActionResult GetProducts(int pageNumber = 1, int pageSize = 10)
        {
            var totalCount = _catalogContext.Products.Where(p => !p.IsDeleted).Count();

            var products = _catalogContext.Products
                                         .Where(p => !p.IsDeleted)
                                         .Skip((pageNumber - 1) * pageSize)
                                         .Take(pageSize)
                                         .ToList();

            if (!products.Any())
                return NotFound(PaginatedResult<ProductListDto>.FailureResult("Ürün Bulunamadı"));

            List<ProductListDto> productDtos = new List<ProductListDto>();

            foreach (var product in products)
            {
                var brandName = _catalogContext.Brands.FirstOrDefault(b => b.Id == product.BrandId)?.Name;
                productDtos.Add(new ProductListDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    BrandId = product.BrandId,
                    BrandName = brandName,
                    Price = product.Price,
                    ImageUrl = _catalogContext.ProductImages.FirstOrDefault(pi => pi.ProductId == product.Id && pi.IsCoverImage)?.Url
                });
            }

            return Ok(PaginatedResult<ProductListDto>.SuccessResult(productDtos, pageNumber, pageSize, totalCount));
        }

        [HttpGet("detail")]
        public IActionResult GetProductById(int id)
        {
            var product = _catalogContext.Products.Where(p => !p.IsDeleted).FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return NotFound(Result<ProductDetailDto>.FailureResult("Ürün Bulunamadı"));
            }

            var brandName = _catalogContext.Brands.FirstOrDefault(b => b.Id == product.BrandId)?.Name;

            var productCategories = _catalogContext.ProductCategories
                .Where(pc => pc.ProductId == product.Id)
                .Select(pc => new CategoryDto
                {
                    Id = pc.CategoryId,
                    Name = _catalogContext.Categories.FirstOrDefault(c => c.Id == pc.CategoryId)!.Name
                })
                .ToList();

            var productFeatures = _catalogContext.ProductFeatures
                .Where(pf => pf.ProductId == product.Id)
                .Select(pf => new ProductFeatureDto
                {
                    Id = pf.FeatureValueId,
                    Value = _catalogContext.FeatureValues.FirstOrDefault(fv => fv.Id == pf.FeatureValueId)!.Value!,
                    Name = _catalogContext.Features.FirstOrDefault(f => f.Id == _catalogContext.FeatureValues.FirstOrDefault(fv => fv.Id == pf.FeatureValueId)!.FeatureId)!.Name!
                })
                .ToList();

            var productDetailDto = new ProductDetailDto
            {
                Id = product.Id,
                Name = product.Name,
                BrandId = product.BrandId,
                BrandName = brandName,
                Price = product.Price,
                Description = product.Description,
                Categories = productCategories,
                Features = productFeatures,
                Images = _catalogContext.ProductImages
                    .Where(pi => pi.ProductId == product.Id)
                    .Select(pi => new ProductImageDto
                    {
                        Id = pi.Id,
                        Url = pi.Url,
                        IsCoverImage = pi.IsCoverImage
                    })
                    .ToList()
            };

            return Ok(Result<ProductDetailDto>.SuccessResult(productDetailDto));
        }

        [HttpPost]
        public IActionResult CreateProduct([FromForm] ProductCreateDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                BrandId = dto.BrandId,
                Price = dto.Price,
                Description = dto.Description
            };

            _catalogContext.Products.Add(product);
            _catalogContext.SaveChanges();

            AddProductCategories(dto, product.Id);
            UploadCoverImage(dto.CoverImage, product.Id);
            UploadImages(dto.Images, product.Id);
            AddBrandCategory(product.BrandId, product.Id);
            AddProductFeatures(dto.FeaturesValueIds, product.Id);

            return Ok(Result<ProductCreateDto>.SuccessResult(dto));
        }

        [HttpPut]
        public IActionResult UpdateProduct([FromForm] ProductUpdateDto dto)
        {
            var product = _catalogContext.Products.FirstOrDefault(p => p.Id == dto.Id);
            if (product == null)
                return NotFound(Result<ProductUpdateDto>.FailureResult("Ürün Bulunamadı"));

            product.Name = dto.Name ?? product.Name;
            product.BrandId = dto.BrandId ?? product.BrandId;
            product.Price = dto.Price ?? product.Price;
            product.Description = dto.Description ?? product.Description;

            _catalogContext.SaveChanges();


            UpdateProductCategories(dto, product.Id);

            DeleteImages(dto.ImagePathsToDelete);

            UpdateCoverImage(dto.NewCoverImage, product.Id);
            UploadImages(dto.NewImages, product.Id);

            DeleteProductFeatures(dto.FeatureValueIdsToDelete, product.Id);
            UpdateProductFeatures(dto.NewFeatureValueIds, product.Id);

            return Ok(Result<ProductUpdateDto>.SuccessResult(dto));
        }

        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            var product = _catalogContext.Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
                return NotFound(Result<Product>.FailureResult("Ürün Bulunamadı"));

            product.IsDeleted = true;
            _catalogContext.SaveChanges();

            return Ok(Result<Product>.SuccessResult(product));
        }



        private void AddProductCategories(ProductCreateDto dto, int productId)
        {
            if (dto.CategoryIds?.Any() != true) return;

            var productCategories = dto.CategoryIds.Select(id => new ProductCategory
            {
                ProductId = productId,
                CategoryId = id
            }).ToList();

            _catalogContext.ProductCategories.AddRange(productCategories);
            _catalogContext.SaveChanges();
        }
        private void UploadCoverImage(IFormFile coverImage, int productId)
        {
            if (coverImage == null) return;

            var result = FileHelper.Upload(coverImage);
            if (!result.Success)
                throw new ArgumentException(result.Message);

            var productImage = new ProductImage
            {
                ProductId = productId,
                Url = result.Data,
                IsCoverImage = true
            };

            _catalogContext.ProductImages.Add(productImage);
            _catalogContext.SaveChanges();
        }
        private void UploadImages(ICollection<IFormFile> images, int productId)
        {
            if (images?.Any() != true) return;

            foreach (var image in images)
            {
                var result = FileHelper.Upload(image);
                if (!result.Success)
                    throw new ArgumentException(result.Message);

                var productImage = new ProductImage
                {
                    ProductId = productId,
                    Url = result.Data,
                    IsCoverImage = false
                };

                _catalogContext.ProductImages.Add(productImage);
                _catalogContext.SaveChanges();
            }
        }
        private void AddBrandCategory(int brandId, int productId)
        {
            var brandCategory = _catalogContext.BrandCategories.FirstOrDefault(bc => bc.BrandId == brandId);
            if (brandCategory == null) return;

            var productCategory = new ProductCategory
            {
                ProductId = productId,
                CategoryId = brandCategory.CategoryId
            };

            _catalogContext.ProductCategories.Add(productCategory);
            _catalogContext.SaveChanges();
        }
        private void AddProductFeatures(ICollection<int> featureValueIds, int productId)
        {
            if (featureValueIds?.Any() != true) return;

            var productFeatures = featureValueIds.Select(id => new ProductFeature
            {
                ProductId = productId,
                FeatureValueId = id
            }).ToList();

            _catalogContext.ProductFeatures.AddRange(productFeatures);
            _catalogContext.SaveChanges();
        }



        private void UpdateProductCategories(ProductUpdateDto dto, int productId)
        {
            var productCategoriesToDelete = _catalogContext.ProductCategories.Where(pc => pc.ProductId == productId && dto.CategoryIdsToDelete!.Contains(pc.CategoryId)).ToList();
            
            if (productCategoriesToDelete.Any())
            {
                _catalogContext.ProductCategories.RemoveRange(productCategoriesToDelete);
                _catalogContext.SaveChanges();
            }

            if (dto.NewCategoryIds?.Any() != true) return;

            var productCategories = dto.NewCategoryIds.Select(id => new ProductCategory
            {
                ProductId = productId,
                CategoryId = id
            }).ToList();

            _catalogContext.ProductCategories.AddRange(productCategories);
            _catalogContext.SaveChanges();
        }
        private void UpdateCoverImage(IFormFile coverImage, int productId)
        {
            if (coverImage == null) return;

            var existingCoverImage = _catalogContext.ProductImages.FirstOrDefault(pi => pi.ProductId == productId && pi.IsCoverImage);
            if (existingCoverImage != null)
            {
                _catalogContext.ProductImages.Remove(existingCoverImage);
                _catalogContext.SaveChanges();
            }

            var result = FileHelper.Upload(coverImage);
            if (!result.Success)
                throw new ArgumentException(result.Message);

            var productImage = new ProductImage
            {
                ProductId = productId,
                Url = result.Data,
                IsCoverImage = true
            };

            _catalogContext.ProductImages.Add(productImage);
            _catalogContext.SaveChanges();
        }
        private void UpdateProductFeatures(ICollection<int> newFeatureValueIds, int productId)
        {
            if (newFeatureValueIds?.Any() != true) return;

            var productFeatures = newFeatureValueIds.Select(id => new ProductFeature
            {
                ProductId = productId,
                FeatureValueId = id
            }).ToList();

            _catalogContext.ProductFeatures.AddRange(productFeatures);
            _catalogContext.SaveChanges();

           
        }
        private void DeleteProductFeatures(ICollection<int> featureValueIdsToDelete, int productId)
        {
            if (featureValueIdsToDelete?.Any() == true)
            {
                foreach (var featureValueId in featureValueIdsToDelete)
                {
                    var productFeature = _catalogContext.ProductFeatures.FirstOrDefault(pf => pf.FeatureValueId == featureValueId && pf.ProductId == productId);
                    if (productFeature != null)
                    {
                        _catalogContext.ProductFeatures.Remove(productFeature);
                        _catalogContext.SaveChanges();
                    }
                }
            }
        }
        private void DeleteImages(ICollection<string> imagePathsToDelete)
        {
            if (imagePathsToDelete?.Any() == true)
            {
                foreach (var imagePath in imagePathsToDelete)
                {
                    var result = FileHelper.Delete(imagePath);
                    if (result.Success)
                    {
                        var productImage = _catalogContext.ProductImages.FirstOrDefault(pi => pi.Url == imagePath);
                        if (productImage != null)
                        {
                            _catalogContext.ProductImages.Remove(productImage);
                            _catalogContext.SaveChanges();
                        }
                    }
                }
            }
        }
    }
}

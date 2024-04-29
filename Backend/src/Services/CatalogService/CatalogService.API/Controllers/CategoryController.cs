using CatalogService.API.Context;
using CatalogService.API.Dtos.ForBrand;
using CatalogService.API.Dtos.ForCategory;
using CatalogService.API.Dtos.ForProduct;
using CatalogService.API.Models;
using CatalogService.API.Utils.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CatalogService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CatalogDbContext _catalogContext;

        public CategoryController(CatalogDbContext catalogContext)
        {
            _catalogContext = catalogContext;
        }

        [HttpGet]
        public IActionResult GetCategories()
        {
            var categories = _catalogContext.Categories.ToList();
            if (categories == null || !categories.Any())
                return NotFound(Result<List<CategoryListDto>>.FailureResult("Kategori Bulunamadı"));

            List<CategoryListDto> categoryListDtos = new List<CategoryListDto>();

            foreach (var category in categories)
            {
                var categoryListDto = new CategoryListDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    Features = _catalogContext.CategoryFeatures
                    .Where(cf => cf.CategoryId == category.Id)
                    .Select(cf => new FeatureDto
                    {
                        Id = cf.Feature.Id,
                        Name = cf.Feature.Name
                    }).ToList(),
                    ParentCategoryId = category.ParentCategoryId ?? null,
                    SubCategories = _catalogContext.Categories.Where(c => c.ParentCategoryId == category.Id).Select(c => new CategoryListDto
                    {
                        Id = c.Id,
                        Name = c.Name,
                        ParentCategoryId = c.ParentCategoryId ?? null,
                        Features = _catalogContext.CategoryFeatures 
                        .Where(cf => cf.CategoryId == c.Id || cf.CategoryId == c.ParentCategoryId)
                        .Select(cf => new FeatureDto
                        {
                            Id = cf.Feature.Id,
                            Name = cf.Feature.Name
                        }).ToList(),
                    }).ToList(),
                };
                categoryListDtos.Add(categoryListDto);
            }


            return Ok(Result<List<CategoryListDto>>.SuccessResult(categoryListDtos));
        }

        [HttpGet("get-by-id")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _catalogContext.Categories.FirstOrDefault(x => x.Id == id);
            if (category == null)
                return NotFound(Result<List<CategoryListDto>>.FailureResult("Kategori Bulunamadı"));

            var categoryListDto = new CategoryListDto
            {
                Id = category.Id,
                Name = category.Name,
                Features = _catalogContext.CategoryFeatures
                .Where(cf => cf.CategoryId == category.Id || cf.CategoryId == category.ParentCategoryId)
                .Select(cf => new FeatureDto
                {
                    Id = cf.Feature.Id,
                    Name = cf.Feature.Name,                
                    Values = (List<FeatureValueListDto>)_catalogContext.FeatureValues.Where(fv => fv.FeatureId == cf.FeatureId).Select(fv => new FeatureValueListDto
                    {
                        Id = fv.Id,
                        Value = fv.Value
                    })
                }).ToList(),
                ParentCategoryId = category.ParentCategoryId ?? null,
                SubCategories = _catalogContext.Categories.Where(c => c.ParentCategoryId == category.Id).Select(c => new CategoryListDto
                {
                    Id = c.Id,
                    Name = c.Name,                 
                    ParentCategoryId = c.ParentCategoryId ?? null
                }).ToList(),
                Brands = _catalogContext.BrandCategories.Where(b => b.CategoryId == category.Id).Include(b => b.Brand).Select(b => new BrandListDto
                {
                    Id = b.Brand.Id,
                    Name = b.Brand.Name
                }).ToList()
            };

            return Ok(Result<CategoryListDto>.SuccessResult(categoryListDto));
        }

        [HttpGet("get-category-names")]
        public IActionResult GetCategoryNames()
        {
            var categories = _catalogContext.Categories.Where(c => c.ParentCategoryId == null).ToList();
            if (categories == null || !categories.Any())
                return NotFound(Result<List<CategoryDto>>.FailureResult("Kategori Bulunamadı"));

            List<CategoryDto> categoryDtos = new List<CategoryDto>();

            foreach (var category in categories)
            {
                var categorytDto = new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name
                };
                categoryDtos.Add(categorytDto);
            }

            return Ok(Result<List<CategoryDto>>.SuccessResult(categoryDtos));
        }

        [HttpGet("get-categories-with-products")]
        public IActionResult GetCategoriesWithProducts()
        {
            var query = _catalogContext.Categories.Where(c => c.ParentCategoryId == null).ToList();

            if (query == null || !query.Any())
                return NotFound(Result<List<CategoryListDto>>.FailureResult("Kategori Bulunamadı"));

            var categoryListDtos = new List<CategoryListDto>();

            foreach (var category in query)
            {
                var categoryListDto = new CategoryListDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    Features = _catalogContext.CategoryFeatures
                    .Where(cf => cf.CategoryId == category.Id || cf.CategoryId == category.ParentCategoryId)
                    .Select(cf => new FeatureDto
                    {
                        Id = cf.Feature.Id,
                        Name = cf.Feature.Name
                    }).ToList(),
                    ParentCategoryId = category.ParentCategoryId ?? null,
                    Products=_catalogContext.ProductCategories.Where(pc=>pc.CategoryId==category.Id).Include(pc=>pc.Product).Select(pc=>new ProductListDto
                    {
                        Id=pc.Product.Id,
                        Name=pc.Product.Name,
                        Price=pc.Product.Price,
                        BrandId=pc.Product.BrandId,
                        BrandName=_catalogContext.Brands.FirstOrDefault(b=>b.Id==pc.Product.BrandId).Name,
                        
                    }).Take(5).ToList()
                };

                categoryListDto.Products.ForEach(p =>
                {
                    p.ImageUrl = _catalogContext.ProductImages.Where(pi=>pi.ProductId==p.Id).FirstOrDefault(pi=>pi.IsCoverImage)?.Url;
                });

                categoryListDtos.Add(categoryListDto);
            }

            return Ok(Result<List<CategoryListDto>>.SuccessResult(categoryListDtos));
        }

        [HttpPost]
        public IActionResult CreateCategory([FromBody] CategoryCreateDto dto)
        {
            var category = new Category
            {
                Name = dto.Name,
                ParentCategoryId = dto.ParentCategoryId ?? null
            };
            category = _catalogContext.Categories.Add(category).Entity;
            _catalogContext.SaveChanges();


            if (dto.FeatureIds != null && dto.FeatureIds.Any())
            {
                _catalogContext
                    .CategoryFeatures
                    .AddRange(dto.FeatureIds!
                    .Select(feature => new CategoryFeature
                    {
                        FeatureId = feature,
                        CategoryId = category.Id
                    }));

                _catalogContext.SaveChanges();
            }

            return Ok(Result<CategoryCreateDto>.SuccessResult(dto));
        }

        [HttpPut]
        public IActionResult UpdateCategory([FromBody] CategoryUpdateDto dto)
        {
            var category = _catalogContext.Categories.Find(dto.Id);
            if (category == null)
                return NotFound(Result<CategoryUpdateDto>.FailureResult("Kategori Bulunamadı"));

            category.Name = dto.Name;
            category.ParentCategoryId = dto.ParentCategoryId ?? null;

            _catalogContext.SaveChanges();

            if (dto.FeatureIds != null && dto.FeatureIds.Any())
            {
                _catalogContext
                    .CategoryFeatures
                    .RemoveRange(_catalogContext
                        .CategoryFeatures
                        .Where(cf => cf.CategoryId == category.Id));

                _catalogContext
                    .CategoryFeatures
                    .AddRange(dto.FeatureIds!
                        .Select(feature => new CategoryFeature
                        {
                            FeatureId = feature,
                            CategoryId = category.Id
                        }));

                _catalogContext.SaveChanges();
            }

            return Ok(Result<CategoryUpdateDto>.SuccessResult(dto));
        }

        [HttpDelete]
        public IActionResult DeleteCategory(int id)
        {
            var category = _catalogContext.Categories.SingleOrDefault(x => x.Id == id);
            if (category == null)
                return NotFound(Result<Category>.FailureResult("Kategori Bulunamadı"));

            category.IsDeleted = true;
            _catalogContext.SaveChanges();


            return Ok(Result<Category>.SuccessResult(category));
        }

        private List<CategoryListDto> GetSubCategories(int categoryId)
        {
            var subCategories = _catalogContext.Categories
                .Where(c => c.ParentCategoryId == categoryId)
                .Select(c => new CategoryListDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Features = _catalogContext.CategoryFeatures
                        .Where(cf => cf.CategoryId == c.Id || cf.CategoryId == c.ParentCategoryId)
                        .Select(cf => new FeatureDto
                        {
                            Id = cf.Feature.Id,
                            Name = cf.Feature.Name
                        })
                        .ToList(),
                    ParentCategoryId = c.ParentCategoryId,
                    SubCategories = GetSubCategories(c.Id)
                })
                .ToList();

            return subCategories.Any() ? subCategories : null;
        }

    }
}

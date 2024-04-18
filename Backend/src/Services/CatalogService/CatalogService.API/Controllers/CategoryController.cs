using CatalogService.API.Context;
using CatalogService.API.Dtos.ForCategory;
using CatalogService.API.Models;
using CatalogService.API.Utils.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
                    .Where(cf => cf.CategoryId == category.Id || cf.CategoryId == category.ParentCategoryId)
                    .Select(cf => new FeatureDto
                    {
                        Id = cf.Feature.Id,
                        Name = cf.Feature.Name
                    }).ToList()
                };
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

    }
}

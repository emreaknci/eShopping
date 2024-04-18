using CatalogService.API.Context;
using CatalogService.API.Dtos.ForBrand;
using CatalogService.API.Models;
using CatalogService.API.Utils.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CatalogService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly CatalogDbContext _catalogContext;

        public BrandController(CatalogDbContext catalogContext)
        {
            _catalogContext = catalogContext;
        }

        [HttpGet]
        public IActionResult GetBrands()
        {
            var brands = _catalogContext.Brands.Where(b=>!b.IsDeleted).ToList();

            if (brands == null || !brands.Any())
                return NotFound(Result<List<BrandListDto>>.FailureResult("Kategori Bulunamadı"));

            List<BrandListDto> brandDtos = new List<BrandListDto>();
            foreach (var brand in brands)
            {
                brandDtos.Add(new BrandListDto
                {
                    Id = brand.Id,
                    Name = brand.Name
                });
            }

            return Ok(Result<List<BrandListDto>>.SuccessResult(brandDtos));
        }

        [HttpPost]
        public IActionResult CreateBrand([FromBody] BrandCreateDto brandCreateDto)
        {
            var brand = new Brand
            {
                Name = brandCreateDto.Name
            };

            _catalogContext.Brands.Add(brand);
            _catalogContext.SaveChanges();

            return Ok(Result<BrandCreateDto>.SuccessResult(brandCreateDto));
        }

        [HttpDelete]
        public IActionResult DeleteBrand([FromQuery] int id)
        {
            var brand = _catalogContext.Brands.FirstOrDefault(x => x.Id == id);

            if (brand == null)
                return NotFound(Result<Brand>.FailureResult("Kategori Bulunamadı"));

            brand.IsDeleted = true;
            _catalogContext.SaveChanges();

            return Ok(Result<Brand>.SuccessResult(brand));
        }

        [HttpPut]
        public IActionResult UpdateBrand([FromBody] BrandUpdateDto brandUpdateDto)
        {
            var brand = _catalogContext.Brands.FirstOrDefault(x => x.Id == brandUpdateDto.Id);

            if (brand == null)
                return NotFound(Result<Brand>.FailureResult("Kategori Bulunamadı"));

            brand.Name = brandUpdateDto.Name;
            _catalogContext.SaveChanges();

            return Ok(Result<BrandUpdateDto>.SuccessResult(brandUpdateDto));
        }
            
    }
}

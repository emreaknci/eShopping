using CatalogService.API.Dtos.ForCategory;

namespace CatalogService.API.Dtos.ForProduct
{
    public class ProductDetailDto
    {
        public ProductDetailDto()
        {
            Categories = new HashSet<CategoryDto>();
            Features = new HashSet<ProductFeatureDto>();
            Images = new HashSet<ProductImageDto>();
        }
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? BrandName { get; set; }
        public int BrandId { get; set; }
        public string? Description { get; set; }
        public int UnitsInStock {  get; set; }
        public decimal Price { get; set; }
        public ICollection<CategoryDto>? Categories { get; set; }
        public ICollection<ProductFeatureDto>? Features { get; set; }
        public ICollection<ProductImageDto>? Images { get; set; }
    }
}

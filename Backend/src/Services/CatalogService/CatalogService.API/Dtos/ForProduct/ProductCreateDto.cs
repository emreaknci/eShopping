namespace CatalogService.API.Dtos.ForProduct
{
    public class ProductCreateDto
    {
        public string? Name { get; set; }
        public int BrandId { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public ICollection<int>? CategoryIds { get; set; }
        public ICollection<int>? FeaturesValueIds { get; set; }
        public ICollection<IFormFile>? Images { get; set; }
        public IFormFile? CoverImage { get; set; }
    }
}

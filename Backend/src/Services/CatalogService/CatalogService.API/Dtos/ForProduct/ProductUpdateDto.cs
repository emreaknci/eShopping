namespace CatalogService.API.Dtos.ForProduct
{
    public class ProductUpdateDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? BrandId { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public ICollection<int>? NewCategoryIds { get; set; }
        public ICollection<int>? CategoryIdsToDelete { get; set; }
        public ICollection<int>? NewFeatureValueIds { get; set; }
        public ICollection<int>? FeatureValueIdsToDelete { get; set; }
        public ICollection<IFormFile>? NewImages { get; set; }
        public ICollection<string>? ImagePathsToDelete { get; set; }
        public IFormFile? NewCoverImage { get; set; }
    }
}

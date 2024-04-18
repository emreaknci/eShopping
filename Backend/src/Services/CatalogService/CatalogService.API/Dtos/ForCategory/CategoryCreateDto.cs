namespace CatalogService.API.Dtos.ForCategory
{
    public class CategoryCreateDto
    {
        public string? Name { get; set; }
        public int? ParentCategoryId { get; set; }
        public List<int>? FeatureIds { get; set; }
    }
    public class CategoryUpdateDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? ParentCategoryId { get; set; }
        public List<int>? FeatureIds { get; set; }
    }

}

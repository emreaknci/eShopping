namespace CatalogService.API.Dtos.ForCategory
{
    public class CategoryListDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? ParentCategoryId { get; set; }
        public List<FeatureDto>? Features { get; set; }
    }

}

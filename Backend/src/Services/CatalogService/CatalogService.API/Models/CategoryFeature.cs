namespace CatalogService.API.Models
{
    public class CategoryFeature : BaseEntity
    {
        public int CategoryId { get; set; }
        public virtual Category? Category { get; set; }
        public int FeatureId { get; set; }
        public virtual Feature? Feature { get; set; }
    }
}

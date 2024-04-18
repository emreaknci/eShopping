namespace CatalogService.API.Models
{
    public class FeatureValue:BaseEntity
    {
        public int FeatureId { get; set; }
        public virtual Feature? Feature { get; set; }
        public string? Value { get; set; }
    }

}

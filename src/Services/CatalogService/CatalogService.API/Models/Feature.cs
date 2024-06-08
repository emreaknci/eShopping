namespace CatalogService.API.Models
{
    public class Feature:BaseEntity
    {
        public Feature()
        {
            FeatureValues = new HashSet<FeatureValue>();
            CategoryFeatures = new HashSet<CategoryFeature>();
        }
        public string? Name { get; set; }
        public virtual ICollection<FeatureValue>? FeatureValues { get; set; }
        public virtual ICollection<CategoryFeature>? CategoryFeatures{ get; set; }


    }
}

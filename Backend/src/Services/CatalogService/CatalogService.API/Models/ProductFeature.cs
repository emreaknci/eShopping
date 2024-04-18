namespace CatalogService.API.Models
{
    public class ProductFeature : BaseEntity
    {
        public int ProductId { get; set; }
        public int FeatureValueId { get; set; }
        public virtual FeatureValue? FeatureValue { get; set; }
    }

}

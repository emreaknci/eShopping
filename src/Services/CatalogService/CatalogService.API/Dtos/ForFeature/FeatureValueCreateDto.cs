namespace CatalogService.API.Dtos.ForFeature
{
    public class FeatureValueCreateDto
    {
        public string? Value { get; set; }
        public int FeatureId { get; set; }
    }

    public class FeatureUpdateDto
    {
        public int Id { get; set; }
        public List<string> NewValues { get; set; }
        
    }

}

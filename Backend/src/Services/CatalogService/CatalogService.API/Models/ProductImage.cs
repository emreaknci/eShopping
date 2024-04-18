namespace CatalogService.API.Models
{
    public class ProductImage:BaseEntity
    {
        public string Url { get; set; }
        public int ProductId { get; set; }
        public virtual Product? Product { get; set; }
        public bool IsCoverImage { get; set; }
    }

}

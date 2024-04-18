namespace CatalogService.API.Models
{
    public class Product:BaseEntity
    {
        public Product()
        {
            ProductCategories = new HashSet<ProductCategory>();
            ProductFeatures = new HashSet<ProductFeature>();
            ProductImages = new HashSet<ProductImage>();
        }
        public string? Name { get; set; }
        public string? Description{ get; set; }
        public decimal Price { get; set; }

        public int BrandId { get; set; }
        public virtual Brand? Brand { get; set; }
        public virtual ICollection<ProductCategory>? ProductCategories { get; set; } 
        public virtual ICollection<ProductFeature>? ProductFeatures { get; set; } 
        public virtual ICollection<ProductImage>? ProductImages { get; set; }
    }

}

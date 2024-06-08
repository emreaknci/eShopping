namespace CatalogService.API.Models
{
    public class Category:BaseEntity
    {
        public Category()
        {
            Features = new HashSet<CategoryFeature>();
            ProductCategories = new HashSet<ProductCategory>();
            BrandCategories = new HashSet<BrandCategory>();
        }
        public string? Name { get; set; }
        public int? ParentCategoryId { get; set; }
        public virtual Category? ParentCategory { get; set; }
        public virtual ICollection<Category>? SubCategories { get; set; }
        public virtual ICollection<CategoryFeature>? Features { get; set; }
        public virtual ICollection<ProductCategory>? ProductCategories { get; set; } 
        public virtual ICollection<BrandCategory>? BrandCategories{ get; set; } 

    }

}

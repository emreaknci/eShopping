namespace CatalogService.API.Models
{
    public class Brand: BaseEntity
    {
        public Brand()
        {
            BrandCategories = new HashSet<BrandCategory>();
        }
        public string? Name { get; set; }
        public virtual ICollection<BrandCategory>? BrandCategories { get; set; }
    }

}

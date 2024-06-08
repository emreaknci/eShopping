using CatalogService.API.Dtos.ForBrand;
using CatalogService.API.Dtos.ForProduct;

namespace CatalogService.API.Dtos.ForCategory
{
    public class CategoryListDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? ParentCategoryId { get; set; }
        public List<CategoryListDto>?  SubCategories { get; set; }
        public List<FeatureDto>? Features { get; set; }
        public List<BrandListDto>? Brands { get; set; }
        public List<ProductListDto>? Products { get; set; }
    }

}

namespace CatalogService.API.Dtos.ForProduct
{
    public class ProductListDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? BrandName { get; set; }
        public int BrandId { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
    }
}

namespace OrderService.Application.Features.Orders.Queries.ViewModels
{
    public class OrderItemViewModel
    {
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }
        public int ProductId { get; set; }
        public string Productname { get; init; }
        public int Units { get; init; }
        public decimal UnitPrice { get; init; }
        public string PictureUrl { get; init; }
    }
}

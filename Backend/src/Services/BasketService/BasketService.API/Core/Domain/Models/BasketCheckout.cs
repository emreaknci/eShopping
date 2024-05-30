namespace BasketService.API.Core.Domain.Models
{

    public class BasketCheckout
    {
        public Address ShippingAddress { get; set; }
        public PaymentDetails PaymentDetails { get; set; }
        public string Buyer { get; set; } // userId
    }
}

namespace BasketService.API.Core.Domain.Models
{
    public class Address
    {
        public string City { get; set; }
        public string Street { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
    }

    public class PaymentDetails
    {
        public string CardNumber { get; set; }
        public string CardHolderName { get; set; }
        public DateTime CardExpiration { get; set; }
        public string CardSecurityNumber { get; set; }
        public int CardTypeId { get; set; }
    }

    public class BasketCheckout
    {
        public Address ShippingAddress { get; set; }
        public PaymentDetails PaymentDetails { get; set; }
        public string Buyer { get; set; }
    }
}

using EventBus.Base.Events;
using OrderService.Domain.Models;

namespace OrderService.API.IntegrationEvents.Events
{
    public class OrderCreatedIntegrationEvent : IntegrationEvent
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int OrderNumber { get; set; }
        public Address ShippingAddress { get; set; }
        public PaymentDetails PaymentDetails { get; set; }
        public string Buyer { get; set; }
        public CustomerBasket Basket { get; set; }

        public OrderCreatedIntegrationEvent(string userId, string userName, Address shippingAddress, PaymentDetails paymentDetails, string buyer, CustomerBasket basket)
        {
            UserId = userId;
            UserName = userName;
            ShippingAddress = shippingAddress;
            PaymentDetails = paymentDetails;
            Buyer = buyer;
            Basket = basket;
        }
    }
}

using EventBus.Base.Events;

namespace CatalogService.API.IntegrationEvents.Events
{
    public class OrderPaymentFailedIntegrationEvent : IntegrationEvent
    {
        public string OrderId { get; set; }
        public string ErrorMessage { get; set; }
        public Dictionary<int, int> OrderItems { get; set; } // ProductId, Quantity

        public OrderPaymentFailedIntegrationEvent(string orderId, string errorMessage, Dictionary<int, int> orderItems)
        {
            OrderId = orderId;
            ErrorMessage = errorMessage;
            OrderItems = orderItems;
        }
    }
}

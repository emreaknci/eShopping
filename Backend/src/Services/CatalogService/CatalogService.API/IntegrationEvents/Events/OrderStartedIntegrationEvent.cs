using EventBus.Base.Events;

namespace CatalogService.API.IntegrationEvents.Events
{
    public class OrderStartedIntegrationEvent : IntegrationEvent
    {
        public string OrderId { get; set; }
        public Dictionary<int, int> OrderItems { get; set; } // ProductId, Quantity

        public OrderStartedIntegrationEvent(string orderId, Dictionary<int, int> orderItems)
        {
            OrderId = orderId;
            OrderItems = orderItems;
        }

    }
}

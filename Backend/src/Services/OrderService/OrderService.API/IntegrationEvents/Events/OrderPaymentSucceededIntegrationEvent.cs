using EventBus.Base.Events;

namespace OrderService.API.IntegrationEvents.Events
{
    public class OrderPaymentSucceededIntegrationEvent : IntegrationEvent
    {

        public string OrderId { get; set; }

        public OrderPaymentSucceededIntegrationEvent(string orderId)
        {
            OrderId = orderId;
        }
    }
}

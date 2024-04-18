using EventBus.Base.Events;

namespace NotificationService.API.IntegrationEvents.Events
{
    public class OrderPaymentSucceededIntegrationEvent : IntegrationEvent
    {
        public int OrderId { get; set; }
        public OrderPaymentSucceededIntegrationEvent(int orderId) => OrderId = orderId;
    }
}

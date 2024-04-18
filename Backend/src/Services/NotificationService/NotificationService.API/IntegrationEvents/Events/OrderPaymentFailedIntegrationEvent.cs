using EventBus.Base.Events;

namespace NotificationService.API.IntegrationEvents.Events
{
    public class OrderPaymentFailedIntegrationEvent : IntegrationEvent
    {
        public int OrderId { get; set; }
        public string ErrorMessage { get; set; }

        public OrderPaymentFailedIntegrationEvent(int orderId, string errorMessage)
        {
            OrderId = orderId;
            ErrorMessage = errorMessage;
        }
    }
}

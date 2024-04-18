using EventBus.Base.Abstraction;
using NotificationService.API.IntegrationEvents.Events;

namespace NotificationService.API.IntegrationEvents.EventHandlers
{
    public class OrderPaymentFailedIntegrationEventHandler : IIntegrationEventHandler<OrderPaymentFailedIntegrationEvent>
    {

        private readonly ILogger<OrderPaymentFailedIntegrationEventHandler> _logger;

        public OrderPaymentFailedIntegrationEventHandler(ILogger<OrderPaymentFailedIntegrationEventHandler> logger)
        {
            _logger = logger;
        }

        public Task Handle(OrderPaymentFailedIntegrationEvent @event)
        {
            _logger.LogInformation($"Order Payment failed with OrderId: {@event.OrderId}, ErrorMessage: {@event.ErrorMessage}");

            return Task.CompletedTask;
        }
    }
}

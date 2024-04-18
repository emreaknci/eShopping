using EventBus.Base.Abstraction;
using NotificationService.API.IntegrationEvents.Events;
using NotificationService.API.Services;

namespace NotificationService.API.IntegrationEvents.EventHandlers
{
    public class OrderPaymentSucceededIntegrationEventHandler : IIntegrationEventHandler<OrderPaymentSucceededIntegrationEvent>
    {
        private readonly ILogger<OrderPaymentSucceededIntegrationEventHandler> _logger;
        private readonly IMailService _mailService;

        public OrderPaymentSucceededIntegrationEventHandler(ILogger<OrderPaymentSucceededIntegrationEventHandler> logger, IMailService mailService)
        {
            _logger = logger;
            _mailService = mailService;
        }

        public Task Handle(OrderPaymentSucceededIntegrationEvent @event)
        {
            _logger.LogInformation($"Order Payment succeeded with OrderId: {@event.OrderId}");

            _mailService.SendOrderCreatedMailAsync("emreakinci696@gmail.com", @event.OrderId, true);

            return Task.CompletedTask;
        }
    }
}

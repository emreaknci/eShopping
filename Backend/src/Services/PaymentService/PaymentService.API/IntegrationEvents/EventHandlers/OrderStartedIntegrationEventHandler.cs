using EventBus.Base.Abstraction;
using EventBus.Base.Events;
using PaymentService.API.IntegrationEvents.Events;

namespace PaymentService.API.IntegrationEvents.EventHandlers
{
    public class OrderStartedIntegrationEventHandler : IIntegrationEventHandler<OrderStartedIntegrationEvent>
    {
        private readonly IConfiguration configuration;
        private readonly IEventBus eventBus;
        private readonly ILogger<OrderStartedIntegrationEventHandler> logger;

        public OrderStartedIntegrationEventHandler(IConfiguration configuration, IEventBus eventBus, ILogger<OrderStartedIntegrationEventHandler> logger)
        {
            this.configuration = configuration;
            this.eventBus = eventBus;
            this.logger = logger;
        }

        public Task Handle(OrderStartedIntegrationEvent @event)
        {

            string keyword = "PaymentSuccess";
            bool paymentSuccessFlag = configuration.GetValue<bool>(keyword);

            IntegrationEvent paymentEvent = paymentSuccessFlag
                ? new OrderPaymentSucceededIntegrationEvent(@event.OrderId)
                : new OrderPaymentFailedIntegrationEvent(@event.OrderId, "Ödeme alınırken bir hata ile karşılaşıldı. Lütfen daha sonra tekrar deneyiniz", @event.OrderItems);

            logger.LogInformation($"PaymentService'deki OrderStartedIntegrationEventHandler tetiklendi. Ödeme Durumu: {paymentSuccessFlag}, Sipariş ID: {@event.OrderId}");


            eventBus.Publish(paymentEvent);

            return Task.CompletedTask;
        }
    }
}

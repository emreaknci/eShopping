using EventBus.Base;
using EventBus.Base.Abstraction;
using EventBus.Factory;
using PaymentService.API.IntegrationEvents.EventHandlers;

namespace PaymentService.API
{
    public static class ServiceRegistration
    {
        public static void AddPaymentServices(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddLogging(builder =>
            {
                builder.AddConsole();
            });
            services.AddTransient<OrderStartedIntegrationEventHandler>();

            services.AddSingleton<IEventBus>(sp =>
            {
                EventBusConfig config = new()
                {
                    ConnectionRetryCount = 5,
                    EventNameSuffix = "IntegrationEvent",
                    EventBusType = EventBusType.RabbitMQ,
                    SubscriberClientAppName = "PaymentService",
                };

                return EventBusFactory.Create(config,sp);
            });
        
        }
    }
}


using EventBus.MassTransit;
using MassTransit;
using PaymentService.API.Consumers;

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

            services.AddMassTransit(x =>
            {
                x.AddConsumer<OrderStartedEventConsumer>();

                x.UsingRabbitMq((context, config) =>
                {
                    config.ReceiveEndpoint(EventBusConstants.BasketServiceQueueName, e =>
                    {
                        e.Consumer<OrderStartedEventConsumer>(context);
                    });
                });

            });
        }
    }
}

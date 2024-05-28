using NotificationService.API.Services;
using Microsoft.Extensions.Options;
using NotificationService.API.Settings;
using MassTransit;
using NotificationService.API.Consumers;
using EventBus.MassTransit;

namespace NotificationService.API
{
    public static class ServiceRegistration
    {
        public static void AddNotificationServices(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddLogging(builder =>
            {
                builder.AddConsole();
            });

            services.Configure<EmailSettings>(configuration.GetSection("EMailSettings"));
            services.AddSingleton<IEmailSettings>(p => p.GetRequiredService<IOptions<EmailSettings>>().Value);

            services.AddTransient<IMailService, MailService>();


            services.AddMassTransit(x =>
            {
                x.AddConsumer<OrderPaymentSucceededEventConsumer>();
                x.AddConsumer<OrderPaymentFailedEventConsumer>();

                x.UsingRabbitMq((context, config) =>
                {
                    config.ReceiveEndpoint(EventBusConstants.BasketServiceQueueName, e =>
                    {
                        e.Consumer<OrderPaymentSucceededEventConsumer>(context);
                        e.Consumer<OrderPaymentFailedEventConsumer>();
                    });
                });

            });
        }
    }

}

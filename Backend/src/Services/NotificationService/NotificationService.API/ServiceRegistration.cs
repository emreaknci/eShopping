using EventBus.Base.Abstraction;
using EventBus.Base;
using EventBus.Factory;
using NotificationService.API.Services;
using Microsoft.Extensions.Options;
using NotificationService.API.Settings;
using NotificationService.API.IntegrationEvents.EventHandlers;

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

            services.AddTransient<OrderPaymentFailedIntegrationEventHandler>();
            services.AddTransient<OrderPaymentSucceededIntegrationEventHandler>();

            services.AddSingleton<IEventBus>(sp =>
            {
                EventBusConfig config = new()
                {
                    ConnectionRetryCount = 5,
                    EventNameSuffix = "IntegrationEvent",
                    EventBusType = EventBusType.RabbitMQ,
                    SubscriberClientAppName = "NotificationService",
                };

                return EventBusFactory.Create(config, sp);
            });

            services.Configure<EmailSettings>(configuration.GetSection("EMailSettings"));
            services.AddSingleton<IEmailSettings>(p => p.GetRequiredService<IOptions<EmailSettings>>().Value);

            services.AddTransient<IMailService, MailService>();
        }
    }

}

using NotificationService.API.Services;
using Microsoft.Extensions.Options;
using NotificationService.API.Settings;

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
        }
    }

}

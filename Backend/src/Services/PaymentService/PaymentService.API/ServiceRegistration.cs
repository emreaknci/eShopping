
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
           
        }
    }
}

using OrderService.API.IntegrationEvents.EventHandlers;

namespace OrderService.API.Extensions.Registrations
{
    public static class EventHandlerRegistratio
    {
        public static IServiceCollection AddEventHandlers(this IServiceCollection services)
        {
            services.AddTransient<OrderCreatedIntegrationEventHandler>();

            return services;
        }
    }
}

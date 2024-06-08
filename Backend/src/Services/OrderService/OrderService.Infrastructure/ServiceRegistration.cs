using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OrderService.Application.Interfaces.Hubs;
using OrderService.Application.Interfaces.Repositories;
using OrderService.Infrastructure.Context;
using OrderService.Infrastructure.Repositories;
using OrderService.Infrastructure.SignalR.Hubs;
using OrderService.Infrastructure.SignalR.Services;

namespace OrderService.Infrastructure
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddPersistenceRegistration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<OrderDbContext>(options =>
              options.UseNpgsql(configuration.GetConnectionString("PostgreSQL")));

            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IBuyerRepository, BuyerRepository>();

            services.AddTransient<IOrderHubService, OrderHubService>();
            services.AddTransient<OrderHub>();

            return services;
        }    
    }
}

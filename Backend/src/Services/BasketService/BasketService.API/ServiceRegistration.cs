using BasketService.API.Core.Application.Repository;
using BasketService.API.Core.Application.Services;
using BasketService.API.Extensions;
using BasketService.API.Infrastructure.Repository;
using BasketService.API.Infrastructure.Services;
using Consul;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http.Features;

namespace BasketService.API
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddBasketServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuth(configuration);

            services.AddSingleton<IConsulClient, ConsulClient>(p => new ConsulClient(consulConfig =>
            {
                var address = configuration["ConsulConfig:Address"];
                consulConfig.Address = new Uri(address);
            }));

            services.AddHttpContextAccessor();

            services.AddTransient<IBasketRepository, RedisBasketRepository>();
            services.AddTransient<IIdentityService, IdentityService>();
          

            services.AddSingleton(sp => sp.AddRedis(configuration));

            return services;
        }

        public static IApplicationBuilder RegisterWithConsul(this IApplicationBuilder app)
        {
            var consulClient = app.ApplicationServices.GetRequiredService<IConsulClient>();

            var loggingFactory = app.ApplicationServices.GetRequiredService<ILoggerFactory>();

            var logger = loggingFactory.CreateLogger<IApplicationBuilder>();


            // Get server IP address
            var features = app.Properties["server.Features"] as FeatureCollection;
            var addresses = features.Get<IServerAddressesFeature>();
            var address = addresses.Addresses.First();

            // Register service with consul
            var uri = new Uri(address);
            var registration = new AgentServiceRegistration()
            {
                ID = $"BasketService",
                Name = "BasketService",
                Address = $"{uri.Host}",
                Port = uri.Port,
                Tags = new[] { "Basket Service", "Basket" }

            };

            logger.LogInformation("Registering with Consul");
            consulClient.Agent.ServiceDeregister(registration.ID).Wait();
            consulClient.Agent.ServiceRegister(registration).Wait();


            var lifetime = app.ApplicationServices.GetRequiredService<IHostApplicationLifetime>();
            lifetime.ApplicationStopping.Register(() =>
            {
                logger.LogInformation("Deregistering from Consul");
                consulClient.Agent.ServiceDeregister(registration.ID).Wait();
            });

            return app;
        }

    }



}

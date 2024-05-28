using CatalogService.API.Consumers;
using CatalogService.API.Context;
using Consul;
using EventBus.MassTransit;
using MassTransit;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

namespace CatalogService.API
{
    public static class ServiceRegistration
    {
        public static void AddCatalogServices (this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CatalogDbContext>(options =>
              options.UseNpgsql(configuration.GetConnectionString("PostgreSQL")));

            services.AddSingleton<IConsulClient, ConsulClient>(p => new ConsulClient(consulConfig =>
            {
                var address = configuration["ConsulConfig:Address"];
                consulConfig.Address = new Uri(address);
            }));


            services.AddMassTransit(x =>
            {
                x.AddConsumer<OrderPaymentSucceededEventConsumer>();
                x.AddConsumer<OrderPaymentFailedEventConsumer>();
                x.AddConsumer<OrderStartedEventConsumer>();
                x.UsingRabbitMq((context, config) =>
                {
                    config.ReceiveEndpoint(EventBusConstants.CatalogServiceQueueName, e =>
                    {
                        e.Consumer<OrderPaymentSucceededEventConsumer>(context);
                        e.Consumer<OrderPaymentFailedEventConsumer>(context);
                        e.Consumer<OrderStartedEventConsumer>(context);
                    });
                });

            });

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
                ID = $"CatalogService",
                Name = "CatalogService",
                Address = $"{uri.Host}",
                Port = uri.Port,
                Tags = new[] { "Catalog Service", "Catalog" }

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

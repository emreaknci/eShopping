using Consul;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http.Features;
using OrderService.Application;
using OrderService.Infrastructure;
using OrderService.API.Extensions.Registrations;
using MassTransit;
using OrderService.API.Consumers;
using EventBus.MassTransit;

namespace OrderService.API
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddOrderServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuth(configuration);
            services.AddPersistenceRegistration(configuration);
            services.AddApplicationServices();

            services.AddSingleton<IConsulClient, ConsulClient>(p => new ConsulClient(consulConfig =>
            {
                var address = configuration["ConsulConfig:Address"];
                consulConfig.Address = new Uri(address);
            }));

            services.AddLogging(configure => configure.AddConsole());


            services.AddMassTransit(x =>
            {
                x.AddConsumer<OrderCreatedCommandConsumer>();
                x.AddConsumer<OrderPaymentSucceededEventConsumer>();
                x.AddConsumer<OrderPaymentFailedEventConsumer>();
                x.UsingRabbitMq((context, config) =>
                {
                    config.ReceiveEndpoint(EventBusConstants.OrderServiceQueueName, e =>
                    {
                        e.Consumer<OrderCreatedCommandConsumer>(context);
                        e.Consumer<OrderPaymentSucceededEventConsumer>(context);
                        e.Consumer<OrderPaymentFailedEventConsumer>(context);
                    });
                });

            });

            services.AddSignalR();

            services.AddHttpContextAccessor();

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
                ID = $"OrderService",
                Name = "OrderService",
                Address = $"{uri.Host}",
                Port = uri.Port,
                Tags = new[] { "Order Service", "Order", "Order Item" }

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

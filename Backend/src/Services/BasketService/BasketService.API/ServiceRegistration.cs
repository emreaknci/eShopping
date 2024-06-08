using BasketService.API.Consumers;
using BasketService.API.Core.Application.Repository;
using BasketService.API.Core.Application.Services;
using BasketService.API.Extensions;
using BasketService.API.Infrastructure.Repository;
using BasketService.API.Infrastructure.Services;
using Consul;
using EventBus.MassTransit;
using MassTransit;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Configuration;

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

            return services;
        }

        public static IApplicationBuilder RegisterWithConsul(this IApplicationBuilder app, IConfiguration configuration)
        {
            var consulClient = app.ApplicationServices.GetRequiredService<IConsulClient>();

            var loggingFactory = app.ApplicationServices.GetRequiredService<ILoggerFactory>();

            var logger = loggingFactory.CreateLogger<IApplicationBuilder>();

            var uri = configuration.GetValue<Uri>("ConsulConfig:ServiceAddress");
            var serviceName = configuration.GetValue<string>("ConsulConfig:ServiceName");
            var serviceId = configuration.GetValue<string>("ConsulConfig:ServiceId");

            var registration = new AgentServiceRegistration()
            {
                ID = serviceId ?? "BasketService",
                Name = serviceName ?? "BasketService",
                Address = $"{uri.Host}",
                Port = uri.Port,
                Tags = new[] { serviceName, serviceId }

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

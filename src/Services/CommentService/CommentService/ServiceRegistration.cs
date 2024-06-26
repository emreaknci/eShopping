﻿using CommentService.Settings;
using Consul;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
namespace CommentService.API
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddCommentServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuth(configuration);

            services.AddSingleton<IConsulClient, ConsulClient>(p => new ConsulClient(consulConfig =>
            {
                var address = configuration["ConsulConfig:Address"];
                consulConfig.Address = new Uri(address);
            }));

            services.Configure<CommentServiceDatabaseSettings>(configuration
                .GetSection(nameof(CommentServiceDatabaseSettings)));

            services.AddSingleton<CommentService.Services.CommentService>();

            return services;

        }
        private static IServiceCollection AddAuth(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<TokenSettings>(configuration.GetSection("TokenSettings"));
            services.AddSingleton<ITokenSettings>(p => p.GetRequiredService<IOptions<TokenSettings>>().Value);

            var tokenSettings = configuration.GetSection("TokenSettings").Get<TokenSettings>();

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSettings.SecurityKey));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = tokenSettings.Issuer,
                    ValidAudience = tokenSettings.Audience,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = signingKey
                };
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
                ID = serviceId ?? "CommentService",
                Name = serviceName??"CommentService",
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

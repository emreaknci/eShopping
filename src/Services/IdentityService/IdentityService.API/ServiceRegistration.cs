using Consul;
using IdentityService.API.Context;
using IdentityService.API.Services;
using IdentityService.API.Utils.Security.JWT;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TokenHandler = IdentityService.API.Utils.Security.JWT.TokenHandler;

namespace IdentityService.API
{
    public static class ServiceRegistration
    {
        public static void AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<IdentityDbContext>(options =>
              options.UseNpgsql(configuration.GetConnectionString("PostgreSQL")));

            services.Configure<TokenSettings>(configuration.GetSection("TokenSettings"));
            services.AddSingleton<ITokenSettings>(p => p.GetRequiredService<IOptions<TokenSettings>>().Value);


            var tokenSettings = configuration.GetSection("TokenSettings").Get<TokenSettings>();

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
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSettings.SecurityKey))
                };
            });



            services.AddTransient<ITokenHandler, TokenHandler>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();

            services.AddSingleton<IConsulClient, ConsulClient>(p => new ConsulClient(consulConfig =>
            {
                var address = configuration["ConsulConfig:Address"];
                consulConfig.Address = new Uri(address);
            }));

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
                ID = serviceId ?? "IdentityService",
                Name = serviceName ?? "IdentityService",
                Address = $"{uri.Host}",
                Port = uri.Port,
                Tags = new[] { serviceName, serviceId, "JWT", "Token" }

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

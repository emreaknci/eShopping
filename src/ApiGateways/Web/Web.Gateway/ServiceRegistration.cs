using Ocelot.DependencyInjection;
using Ocelot.Provider.Consul;
using Ocelot.Cache.CacheManager;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Web.Gateway.Settings;
using Microsoft.AspNetCore.HttpLogging;
using Serilog.Sinks.PostgreSQL;
using Serilog;
using Web.Gateway.Configurations;
using Serilog.Core;

namespace Web.Gateway
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddGatewayServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuth(configuration);


            services.AddOcelot()
                .AddConsul()
                .AddCacheManager(x => x.WithDictionaryHandle());

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
     
    }

}

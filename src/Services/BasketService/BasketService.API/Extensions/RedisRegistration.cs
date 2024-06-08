using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace BasketService.API.Extensions
{
    public static class RedisRegistration
    {
        public static ConnectionMultiplexer AddRedis(this IServiceProvider services, IConfiguration configuration)
        {
            var redisSettings = configuration.GetSection("RedisSettings").Get<RedisSettings>();

            var redisConfiguration = new ConfigurationOptions
            {
                EndPoints = { { redisSettings.Host, redisSettings.Port } },
                ResolveDns = true
            };

            return ConnectionMultiplexer.Connect(redisConfiguration);
        }
    }


    public class RedisSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
    }
}

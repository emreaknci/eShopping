using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace OrderService.Infrastructure.Context
{
    static class Configuration
    {
        public static string ConnectionString()
        {
            ConfigurationManager configurationManager = new();
            configurationManager.SetBasePath(Path.Combine(Directory.GetCurrentDirectory(),
                "../OrderService.API"));
            configurationManager.AddJsonFile("appsettings.json");
            return configurationManager.GetConnectionString("PostgreSQL");
        }
    }
}

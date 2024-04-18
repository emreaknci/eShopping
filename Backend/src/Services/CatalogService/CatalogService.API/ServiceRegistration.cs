using CatalogService.API.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CatalogService.API
{
    public static class ServiceRegistration
    {
        public static void AddCatalogServices (this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CatalogDbContext>(options =>
              options.UseNpgsql(configuration.GetConnectionString("PostgreSQL")));
        }   
    }
}

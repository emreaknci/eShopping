using CatalogService.API.Context;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Polly;

namespace CatalogService.API.Extensions
{
    public static class MigrationExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<CatalogDbContext>();

            context.Database.Migrate();
        }
    }
}

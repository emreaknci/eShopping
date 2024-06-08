using Microsoft.EntityFrameworkCore;
using Npgsql;
using OrderService.Infrastructure.Context;
using Polly;

namespace OrderService.API.Extensions
{
    public static class MigrationExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<OrderDbContext>();

            context.Database.Migrate();
        }
    }
}

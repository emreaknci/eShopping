using IdentityService.API.Context;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.API.Extensions
{
    public static class MigrationExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<IdentityDbContext>();

            context.Database.Migrate();
        }
    }
}

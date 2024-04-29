using CatalogService.API.Context.EntityConfigurations;
using CatalogService.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace CatalogService.API.Context
{
    public class CatalogDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public CatalogDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public const string DEFAULT_SCHEMA = "public";


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("PostgreSQL"));
        }

        public override int SaveChanges()
        {
            var datas = ChangeTracker.Entries<BaseEntity>();
            foreach (var data in datas)
            {
                _ = data.State switch
                {
                    EntityState.Added => data.Entity.CreatedDate = DateTime.UtcNow,
                    EntityState.Modified => data.Entity.UpdatedDate = DateTime.UtcNow,
                    _ => DateTime.UtcNow,
                };
            }
            return base.SaveChanges();
        }
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var datas = ChangeTracker.Entries<BaseEntity>();
            foreach (var data in datas)
            {
                _ = data.State switch
                {
                    EntityState.Added => data.Entity.CreatedDate = DateTime.UtcNow,
                    EntityState.Modified => data.Entity.UpdatedDate = DateTime.UtcNow,
                    _ => DateTime.UtcNow,
                };
            }
            return await base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.ApplyConfiguration(new BrandCategoryEntityConfiguration());
            //modelBuilder.ApplyConfiguration(new BrandEntityConfiguration());
            //modelBuilder.ApplyConfiguration(new CategoryEntityConfiguration());
            //modelBuilder.ApplyConfiguration(new CategoryFeatureEntityConfiguration());
            //modelBuilder.ApplyConfiguration(new FeatureEntityConfiguration());
            //modelBuilder.ApplyConfiguration(new FeatureValueEntityConfiguration());
            //modelBuilder.ApplyConfiguration(new ProductCategoryEntityConfiguration());
            //modelBuilder.ApplyConfiguration(new ProductEntityConfiguration());
            //modelBuilder.ApplyConfiguration(new ProductFeatureEntityConfiguration());
            //modelBuilder.ApplyConfiguration(new ProductImageEntityConfiguration());


            modelBuilder.Entity<Feature>().HasData(SeedData.Features());
            modelBuilder.Entity<FeatureValue>().HasData(SeedData.FeatureValues());
            modelBuilder.Entity<Brand>().HasData(SeedData.Brands());
            modelBuilder.Entity<Category>().HasData(SeedData.Categories());
            modelBuilder.Entity<CategoryFeature>().HasData(SeedData.CategoryFeatures());
        }

        public DbSet<Brand> Brands { get; set; }
        public DbSet<BrandCategory> BrandCategories { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<CategoryFeature> CategoryFeatures { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<FeatureValue> FeatureValues { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<ProductFeature> ProductFeatures{ get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
    }
}

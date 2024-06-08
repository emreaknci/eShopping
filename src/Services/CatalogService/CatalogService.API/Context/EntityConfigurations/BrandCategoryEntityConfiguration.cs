using CatalogService.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CatalogService.API.Context.EntityConfigurations
{
    public class BrandCategoryEntityConfiguration : IEntityTypeConfiguration<BrandCategory>
    {
        public void Configure(EntityTypeBuilder<BrandCategory> builder)
        {
            builder.ToTable("brand_categories", CatalogDbContext.DEFAULT_SCHEMA);

            builder.HasKey(bc => bc.Id);

            builder.HasOne(bc => bc.Brand)
                 .WithMany(b => b.BrandCategories)
                 .HasForeignKey(bc => bc.BrandId)
                 .IsRequired()
                 .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(bc => bc.Category)
                   .WithMany(c => c.BrandCategories)
                   .HasForeignKey(bc => bc.CategoryId)
                   .IsRequired()
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

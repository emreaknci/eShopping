using CatalogService.API.Context;
using CatalogService.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class CategoryFeatureEntityConfiguration : IEntityTypeConfiguration<CategoryFeature>
{
    public void Configure(EntityTypeBuilder<CategoryFeature> builder)
    {
        builder.ToTable("category_features", CatalogDbContext.DEFAULT_SCHEMA);

        builder.HasKey(cf => cf.Id);

        builder.HasOne(cf => cf.Category)
               .WithMany(c => c.Features)
               .HasForeignKey(cf => cf.CategoryId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(cf => cf.Feature)
               .WithMany()
               .HasForeignKey(cf => cf.FeatureId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
    }
}


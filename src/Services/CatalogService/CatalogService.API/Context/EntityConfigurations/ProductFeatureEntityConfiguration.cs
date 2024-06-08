using CatalogService.API.Context;
using CatalogService.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class ProductFeatureEntityConfiguration : IEntityTypeConfiguration<ProductFeature>
{
    public void Configure(EntityTypeBuilder<ProductFeature> builder)
    {
        builder.ToTable("product_features", CatalogDbContext.DEFAULT_SCHEMA);

        builder.HasKey(pf => pf.Id);
        builder.Property(pf => pf.Id).ValueGeneratedOnAdd();

        builder.HasOne(pf => pf.Product)
               .WithMany(p => p.ProductFeatures)
               .HasForeignKey(pf => pf.ProductId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(pf => pf.FeatureValue)
               .WithMany()
               .HasForeignKey(pf => pf.FeatureValueId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
    }
}




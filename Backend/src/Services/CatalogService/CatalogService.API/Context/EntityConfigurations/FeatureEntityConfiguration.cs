using CatalogService.API.Context;
using CatalogService.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class FeatureEntityConfiguration : IEntityTypeConfiguration<Feature>
{
    public void Configure(EntityTypeBuilder<Feature> builder)
    {
        builder.ToTable("features", CatalogDbContext.DEFAULT_SCHEMA);

        builder.HasKey(f => f.Id);
        builder.Property(f => f.Id).ValueGeneratedOnAdd();

        builder.Property(f => f.Name)
               .HasColumnName("Name")
               .HasColumnType("varchar(100)") 
               .HasMaxLength(100)
               .IsRequired();

        builder.HasMany(f => f.FeatureValues)
               .WithOne(fv => fv.Feature)
               .HasForeignKey(fv => fv.FeatureId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(f => f.CategoryFeatures)
               .WithOne(cf => cf.Feature)
               .HasForeignKey(cf => cf.FeatureId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
    }
}


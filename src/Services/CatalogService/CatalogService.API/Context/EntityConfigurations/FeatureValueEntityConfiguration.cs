using CatalogService.API.Context;
using CatalogService.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class FeatureValueEntityConfiguration : IEntityTypeConfiguration<FeatureValue>
{
    public void Configure(EntityTypeBuilder<FeatureValue> builder)
    {
        builder.ToTable("feature_values", CatalogDbContext.DEFAULT_SCHEMA);

        builder.HasKey(fv => fv.Id);
        builder.Property(fv => fv.Id).ValueGeneratedOnAdd();

        builder.Property(fv => fv.Value)
               .HasColumnName("Value")
               .HasColumnType("varchar(100)")
               .HasMaxLength(100)
               .IsRequired();

        builder.HasOne(fv => fv.Feature)
               .WithMany(f => f.FeatureValues)
               .HasForeignKey(fv => fv.FeatureId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
    }
}




using CatalogService.API.Context;
using CatalogService.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class ProductImageEntityConfiguration : IEntityTypeConfiguration<ProductImage>
{
    public void Configure(EntityTypeBuilder<ProductImage> builder)
    {
        builder.ToTable("product_images", CatalogDbContext.DEFAULT_SCHEMA);

        builder.HasKey(pi => pi.Id);
        builder.Property(pi => pi.Id).ValueGeneratedOnAdd();

        builder.Property(pi => pi.Url)
               .HasColumnName("Url")
               .HasColumnType("varchar(255)")
               .HasMaxLength(255)
               .IsRequired();

        builder.HasOne(pi => pi.Product)
               .WithMany(p => p.ProductImages)
               .HasForeignKey(pi => pi.ProductId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.Property(pi => pi.IsCoverImage)
               .HasColumnName("IsCoverImage")
               .IsRequired();
    }
}




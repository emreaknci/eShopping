using CatalogService.API.Context;
using CatalogService.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class ProductEntityConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("products", CatalogDbContext.DEFAULT_SCHEMA);

        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id).ValueGeneratedOnAdd();

        builder.Property(p => p.Name)
               .HasColumnName("Name")
               .HasColumnType("varchar(255)")
               .HasMaxLength(255)
               .IsRequired();

        builder.Property(p => p.Description)
               .HasColumnName("Description")
               .HasColumnType("text") 
               .IsRequired(false); 

        builder.Property(p => p.Price)
               .HasColumnName("Price")
               .HasColumnType("decimal(18,2)") 
               .IsRequired();

        builder.HasOne(p => p.Brand)
               .WithMany(b => b.Products)
               .HasForeignKey(p => p.BrandId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(p => p.ProductCategories)
               .WithOne(pc => pc.Product)
               .HasForeignKey(pc => pc.ProductId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(p => p.ProductFeatures)
               .WithOne(pf => pf.Product)
               .HasForeignKey(pf => pf.ProductId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(p => p.ProductImages)
               .WithOne(pi => pi.Product)
               .HasForeignKey(pi => pi.ProductId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
    }
}




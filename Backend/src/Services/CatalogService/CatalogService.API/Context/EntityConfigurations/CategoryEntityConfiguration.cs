using CatalogService.API.Context;
using CatalogService.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class CategoryEntityConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("categories", CatalogDbContext.DEFAULT_SCHEMA);

        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id).ValueGeneratedOnAdd();

        builder.Property(c => c.Name)
               .HasColumnName("Name")
               .HasColumnType("varchar(100)") 
               .HasMaxLength(100)
               .IsRequired();

        builder.HasMany(c => c.Features)
               .WithOne(cf => cf.Category)
               .HasForeignKey(cf => cf.CategoryId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.ProductCategories)
               .WithOne(pc => pc.Category)
               .HasForeignKey(pc => pc.CategoryId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.BrandCategories)
               .WithOne(bc => bc.Category)
               .HasForeignKey(bc => bc.CategoryId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(c => c.ParentCategory)
               .WithMany()
               .HasForeignKey(c => c.ParentCategoryId)
               .IsRequired(false)
               .OnDelete(DeleteBehavior.Restrict); 
    }
}


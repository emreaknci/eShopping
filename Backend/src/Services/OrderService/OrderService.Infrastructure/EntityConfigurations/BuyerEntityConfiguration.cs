using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderService.Domain.AggregateModels.BuyerAggregate;
using OrderService.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Infrastructure.EntityConfigurations
{
    internal class BuyerEntityConfiguration : IEntityTypeConfiguration<Buyer>
    {
        public void Configure(EntityTypeBuilder<Buyer> builder)
        {
            builder.ToTable("Buyers", OrderDbContext.DEFAULT_SCHEMA);

            builder.HasKey(b => b.Id);

            builder.Ignore(b => b.DomainEvents);
            builder.Property(b => b.Id).ValueGeneratedOnAdd();


            builder.Property(b=>b.UserId).HasColumnName("UserId").HasColumnType("varchar").HasMaxLength(200).IsRequired();

            builder.Property(b => b.FullName).HasColumnName("FullName").HasColumnType("varchar").HasMaxLength(100).IsRequired();

            builder.HasMany(b => b.PaymentMethods)
                .WithOne()
                .HasForeignKey(i=>i.Id)
                .OnDelete(DeleteBehavior.Cascade);


            var navigation = builder.Metadata.FindNavigation(nameof(Buyer.PaymentMethods));

            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}

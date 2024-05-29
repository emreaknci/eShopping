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
    internal class PaymentMethodEntityConfiguration : IEntityTypeConfiguration<PaymentMethod>
    {
        public void Configure(EntityTypeBuilder<PaymentMethod> builder)
        {
            builder.ToTable("PaymentMethods", OrderDbContext.DEFAULT_SCHEMA);


            builder.Ignore(b=> b.DomainEvents);

            builder.HasKey(o => o.Id);
            builder.Property(o => o.Id).HasColumnName("Id").ValueGeneratedOnAdd();


            builder.Property(i=>i.CardHolderName)
                .UsePropertyAccessMode(PropertyAccessMode.Field)
                .HasColumnName("CardHolderName")
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(i=>i.CardNumber)
                .UsePropertyAccessMode(PropertyAccessMode.Field)
                .HasColumnName("CardNumber")
                .HasMaxLength(25)
                .IsRequired();

            builder.Property(i=>i.Alias)
                .UsePropertyAccessMode(PropertyAccessMode.Field)
                .HasColumnName("Alias")
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(i=>i.Expiration)
                .UsePropertyAccessMode(PropertyAccessMode.Field)
                .HasColumnName("Expiration")
                .HasMaxLength(25)
                .IsRequired();

            builder.Property(i=>i.CardTypeId)
                .UsePropertyAccessMode(PropertyAccessMode.Field)
                .HasColumnName("CardTypeId")
                .IsRequired();

            builder.HasOne(p=>p.CardType)
                .WithMany()
                .HasForeignKey(i=>i.CardTypeId);
        }
    }
}

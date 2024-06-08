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
    internal class CardTypeEntityConfiguration : IEntityTypeConfiguration<CardType>
    {
        public void Configure(EntityTypeBuilder<CardType> builder)
        {
            builder.ToTable("CardTypes", OrderDbContext.DEFAULT_SCHEMA);

            builder.HasKey(ct => ct.Id);

            builder.Property(ct => ct.Id)
                .HasColumnName("id")
                .ValueGeneratedNever() 
                .IsRequired();

            builder.Property(ct => ct.Name)
                .HasMaxLength(200)
                .IsRequired();

            builder.HasData(
                CardType.Amex,
                CardType.Visa,
                CardType.MasterCard
            );
        }
    }
}

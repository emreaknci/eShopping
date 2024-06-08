using CatalogService.API.Context;
using EventBus.MassTransit.Events;
using MassTransit;
using Microsoft.EntityFrameworkCore;

namespace CatalogService.API.Consumers
{
    public class OrderPaymentFailedEventConsumer : IConsumer<OrderPaymentFailed>
    {
        private readonly CatalogDbContext _catalogContext;

        public OrderPaymentFailedEventConsumer(CatalogDbContext catalogContext)
        {
            _catalogContext = catalogContext;
        }

        public async Task Consume(ConsumeContext<OrderPaymentFailed> context)
        {
            Console.WriteLine("\n" + context.Message.OrderId + " siparişinin ödemesi başarısız oldu. Stok tekrar güncelleniyor");
            foreach (var item in context.Message.Items)
            {
                Console.WriteLine($"{item.Key} ürününden {item.Value} adet stoklara eklendi");
                var result = await IncreaseProductUnitsInStock(item.Key, item.Value);

                if (!result)

                    Console.WriteLine($"Stok düzeltilirken hata oluştu.");
                else
                    Console.WriteLine($"{item.Key} ürününden {item.Value} adet stoklara eklendi");
            }

        }

        public async Task<bool> IncreaseProductUnitsInStock(int productId, int units)
        {
            var product = _catalogContext.Products.FirstOrDefault(p => p.Id == productId);
            if (product == null)

                return false;

            product.UnitsInStock += units;
            var result = await _catalogContext.SaveChangesAsync();

            return result > 0;
        }
    }

}

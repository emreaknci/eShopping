using CatalogService.API.Context;
using EventBus.MassTransit.Commands;
using MassTransit;

namespace CatalogService.API.Consumers
{
    public class OrderCancelledCommandConsumer : IConsumer<OrderCancelledCommand>
    {
        private readonly CatalogDbContext _catalogContext;

        public OrderCancelledCommandConsumer(CatalogDbContext catalogContext)
        {
            _catalogContext = catalogContext;
        }

        public async Task Consume(ConsumeContext<OrderCancelledCommand> context)
        {
            Console.WriteLine("\n" + context.Message.OrderId + " siparişi iptal edildi. Stok tekrar güncelleniyor");

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

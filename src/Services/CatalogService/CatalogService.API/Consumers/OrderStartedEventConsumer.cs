using CatalogService.API.Context;
using EventBus.MassTransit.Events;
using MassTransit;

namespace CatalogService.API.Consumers
{
    public class OrderStartedEventConsumer : IConsumer<OrderStartedEvent>
    {
        private readonly CatalogDbContext _catalogContext;

        public OrderStartedEventConsumer(CatalogDbContext catalogContext)
        {
            _catalogContext = catalogContext;
        }

        public async Task Consume(ConsumeContext<OrderStartedEvent> context)
        {
            var message = context.Message;

            foreach (var item in message.Items)
            {
                var result = await DecreaseProductUnitsInStock(item.Key, item.Value);
                if (!result)
                
                    Console.WriteLine($"Stok düzeltilirken hata oluştu.");
                else 
                    Console.WriteLine($"{item.Key} ürününden {item.Value} adet stoklardan düştü");
            }
        }

        public async Task<bool> DecreaseProductUnitsInStock(int productId, int units)
        {
            var product = _catalogContext.Products.FirstOrDefault(p => p.Id == productId);
            if (product == null)

                return false;

            product.UnitsInStock -= units;
            var result = await _catalogContext.SaveChangesAsync();

            return result > 0;
        }
    }

}

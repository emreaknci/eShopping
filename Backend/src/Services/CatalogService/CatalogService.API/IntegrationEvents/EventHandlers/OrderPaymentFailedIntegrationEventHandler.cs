using CatalogService.API.Context;
using CatalogService.API.IntegrationEvents.Events;
using EventBus.Base.Abstraction;

namespace CatalogService.API.IntegrationEvents.EventHandlers
{
    public class OrderPaymentFailedIntegrationEventHandler : IIntegrationEventHandler<OrderPaymentFailedIntegrationEvent>
    {
        private readonly CatalogDbContext _catalogContext;

        public OrderPaymentFailedIntegrationEventHandler(CatalogDbContext catalogContext)
        {
            _catalogContext = catalogContext;
        }

        public async Task Handle(OrderPaymentFailedIntegrationEvent @event)
        {
            var getOrderItems = _catalogContext.Products.Where(x => @event.OrderItems.Keys.Contains(x.Id)).ToList();

            foreach (var item in getOrderItems)
            {
                item.UnitsInStock += @event.OrderItems[item.Id];
            }

            await _catalogContext.SaveChangesAsync();
        }
    }
}

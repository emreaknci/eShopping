using BasketService.API.Core.Application.Repository;
using BasketService.API.IntegrationEvents.Events;
using EventBus.Base.Abstraction;

namespace BasketService.API.IntegrationEvents.EventHandlers
{
    public class OrderCreatedIntegrationEventHandler:IIntegrationEventHandler<OrderCreatedIntegrationEvent>
    {
        private readonly IBasketRepository _repository;
        private readonly ILogger<OrderCreatedIntegrationEventHandler> _logger;

        public OrderCreatedIntegrationEventHandler(IBasketRepository repository, ILogger<OrderCreatedIntegrationEventHandler> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task Handle(OrderCreatedIntegrationEvent @event)
        {
            _logger.LogInformation("----- Handling integration event: {IntegrationEventId} at {AppName} - ({@IntegrationEvent})", @event.Id, "BasketService.API", @event);
            await _repository.DeleteBasketAsync(@event.UserId.ToString());
        }
    }
}

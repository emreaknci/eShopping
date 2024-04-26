using EventBus.Base.Abstraction;
using OrderService.API.IntegrationEvents.Events;

namespace OrderService.API.IntegrationEvents.EventHandlers
{
    public class OrderStartedIntegrationEventHandler:IIntegrationEventHandler<OrderStartedIntegrationEvent>
    {
        public Task Handle(OrderStartedIntegrationEvent @event)
        {
            throw new NotImplementedException();
        }
    }
}

using EventBus.Base.Abstraction;
using MediatR;
using OrderService.API.IntegrationEvents.Events;
using OrderService.Application.Features.Orders.Commands.ChangeOrderStatus;
using OrderService.Domain.AggregateModels.OrderAggregate;

namespace OrderService.API.IntegrationEvents.EventHandlers
{
    public class OrderPaymentFailedIntegrationEventHandler : IIntegrationEventHandler<OrderPaymentFailedIntegrationEvent>
    {
        private readonly IMediator _mediator;
        private readonly ILogger<OrderPaymentFailedIntegrationEventHandler> _logger;

        public OrderPaymentFailedIntegrationEventHandler(IMediator mediator, ILogger<OrderPaymentFailedIntegrationEventHandler> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        public async Task Handle(OrderPaymentFailedIntegrationEvent @event)
        {
            _logger.LogInformation("Handling integration event: {IntegrationEventId} at {AppName} - ({@IntegrationEvent})", @event.Id, typeof(Program).Namespace, @event);

            var orderPaymentFailedCommand = new ChangeOrderStatusCommand(@event.OrderId, OrderStatus.Cancelled);

            await _mediator.Send(orderPaymentFailedCommand);
        }
    }
}

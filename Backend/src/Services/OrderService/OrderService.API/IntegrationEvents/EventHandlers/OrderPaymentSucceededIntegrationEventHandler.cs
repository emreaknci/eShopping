using EventBus.Base.Abstraction;
using MediatR;
using OrderService.API.IntegrationEvents.Events;
using OrderService.Application.Features.Orders.Commands.ChangeOrderStatus;
using OrderService.Domain.AggregateModels.OrderAggregate;

namespace OrderService.API.IntegrationEvents.EventHandlers
{
    public class OrderPaymentSucceededIntegrationEventHandler : IIntegrationEventHandler<OrderPaymentSucceededIntegrationEvent>
    {
        private readonly IMediator _mediator;
        private readonly ILogger<OrderPaymentSucceededIntegrationEventHandler> _logger;

        public OrderPaymentSucceededIntegrationEventHandler(IMediator mediator, ILogger<OrderPaymentSucceededIntegrationEventHandler> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        public async Task Handle(OrderPaymentSucceededIntegrationEvent @event)
        {
            _logger.LogInformation("Handling integration event: {IntegrationEventId} at {AppName} - ({@IntegrationEvent})", @event.Id, typeof(Program).Namespace, @event);

            var orderPaymentSucceededCommand = new ChangeOrderStatusCommand(@event.OrderId,OrderStatus.Paid);

            await _mediator.Send(orderPaymentSucceededCommand);
        }
    }
}

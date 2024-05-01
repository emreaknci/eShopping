using EventBus.Base.Abstraction;
using MediatR;
using OrderService.API.IntegrationEvents.Events;
using OrderService.Application.Features.Orders.Commands.CreateOrder;

namespace OrderService.API.IntegrationEvents.EventHandlers
{
    public class OrderCreatedIntegrationEventHandler : IIntegrationEventHandler<OrderCreatedIntegrationEvent>
    {

        private readonly IMediator _mediator;
        private readonly ILogger<OrderCreatedIntegrationEventHandler> _logger;

        public OrderCreatedIntegrationEventHandler(IMediator mediator, ILogger<OrderCreatedIntegrationEventHandler> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        public async Task Handle(OrderCreatedIntegrationEvent @event)
        {
            _logger.LogInformation("Handling integration event: {IntegrationEventId} at {AppName} - ({@IntegrationEvent})", @event.Id, typeof(Program).Namespace, @event);

            var createdOrderCommand = new CreateOrderCommand(
                @event.Basket.Items, @event.UserId,
                @event.UserName, @event.ShippingAddress.City, @event.ShippingAddress.Street, @event.ShippingAddress.State,
                @event.ShippingAddress.Country, @event.ShippingAddress.ZipCode, @event.PaymentDetails.CardNumber,
                @event.PaymentDetails.CardHolderName, @event.PaymentDetails.CardExpiration,
                @event.PaymentDetails.CardSecurityNumber, @event.PaymentDetails.CardTypeId);

            await _mediator.Send(createdOrderCommand);
        }
    }
}

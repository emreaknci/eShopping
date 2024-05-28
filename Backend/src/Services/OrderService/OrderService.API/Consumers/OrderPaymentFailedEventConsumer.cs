using EventBus.MassTransit.Events;
using MassTransit;
using MediatR;
using OrderService.Application.Features.Orders.Commands.ChangeOrderStatus;
using OrderService.Domain.AggregateModels.OrderAggregate;

namespace OrderService.API.Consumers
{
    public class OrderPaymentFailedEventConsumer : IConsumer<OrderPaymentFailed>
    {
        private readonly IMediator _mediator;

        public OrderPaymentFailedEventConsumer(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task Consume(ConsumeContext<OrderPaymentFailed> context)
        {

            var message = context.Message;
            var changeOrderStatusCommand = new ChangeOrderStatusCommand(message.OrderId, OrderStatus.Cancelled);

            await _mediator.Send(changeOrderStatusCommand);
        }
    }

}

using EventBus.MassTransit.Events;
using MassTransit;
using MediatR;
using OrderService.Application.Features.Orders.Commands.ChangeOrderStatus;
using OrderService.Application.Interfaces.Hubs;
using OrderService.Domain.AggregateModels.OrderAggregate;
using OrderService.Infrastructure.SignalR.Hubs;

namespace OrderService.API.Consumers
{
    public class OrderPaymentFailedEventConsumer : IConsumer<OrderPaymentFailed>
    {
        private readonly IMediator _mediator;
        private readonly IOrderHubService _orderHubService;


        public OrderPaymentFailedEventConsumer(IMediator mediator, IOrderHubService orderHubService)
        {
            _mediator = mediator;
            _orderHubService = orderHubService;
        }

        public async Task Consume(ConsumeContext<OrderPaymentFailed> context)
        {

            var message = context.Message;
            var changeOrderStatusCommand = new ChangeOrderStatusCommand(message.OrderId, OrderStatus.PaymentFailed);

            await _orderHubService.OrderPaymentFailedMessageAsync(message.BuyerId);

            await _mediator.Send(changeOrderStatusCommand);
        }
    }

}

using EventBus.MassTransit.Events;
using MassTransit;
using MediatR;
using OrderService.Application.Features.Orders.Commands.ChangeOrderStatus;
using OrderService.Application.Interfaces.Hubs;
using OrderService.Domain.AggregateModels.OrderAggregate;
using OrderService.Domain.SeedWork;

namespace OrderService.API.Consumers
{
    public class OrderPaymentSucceededEventConsumer:IConsumer<OrderPaymentSucceeded>
    {
        private readonly IMediator _mediator;
        private readonly IOrderHubService _orderHubService;


        public OrderPaymentSucceededEventConsumer(IMediator mediator, IOrderHubService orderHubService)
        {
            _mediator = mediator;
            _orderHubService = orderHubService;
        }

        public async Task Consume(ConsumeContext<OrderPaymentSucceeded> context)
        {
            var message = context.Message;
            var changeOrderStatusCommand = new ChangeOrderStatusCommand(message.OrderId,GetRandomPaidOrShippedStatus());
            await _orderHubService.OrderPaymentSuccededMessageAsync(message.BuyerId);

            await _mediator.Send(changeOrderStatusCommand);
        }

        private OrderStatus GetRandomPaidOrShippedStatus()
        {
            var paidAndShippedStatuses = new List<OrderStatus> { OrderStatus.Paid, OrderStatus.Shipped };
            var random = new Random();
            return paidAndShippedStatuses.ElementAt(random.Next(paidAndShippedStatuses.Count));
        }
    }

}

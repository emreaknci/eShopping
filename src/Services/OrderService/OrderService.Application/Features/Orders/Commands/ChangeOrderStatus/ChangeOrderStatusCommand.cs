using EventBus.MassTransit;
using EventBus.MassTransit.Commands;
using MassTransit;
using MediatR;
using OrderService.Application.Interfaces.Repositories;
using OrderService.Domain.AggregateModels.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Features.Orders.Commands.ChangeOrderStatus
{
    public class ChangeOrderStatusCommand : IRequest<bool>
    {
        public string OrderId { get; set; }
        public OrderStatus NewStatus { get; set; }

        public ChangeOrderStatusCommand(string orderId, OrderStatus newStatus)
        {
            OrderId = orderId;
            NewStatus = newStatus;
        }
    }

    public class ChangeOrderStatusCommandHandler : IRequestHandler<ChangeOrderStatusCommand, bool>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ISendEndpoint _bus;


        public ChangeOrderStatusCommandHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;


            var bus = BusConfigurator.ConfigureBus();
            var sendToUri = new Uri($"{EventBusConstants.Uri}/{EventBusConstants.CatalogServiceQueueName}");
            _bus = bus.GetSendEndpoint(sendToUri).Result;
        }

        public async Task<bool> Handle(ChangeOrderStatusCommand request, CancellationToken cancellationToken)
        {
            Order order = await _orderRepository.GetSingleAsync(o => o.Id.ToString() == request.OrderId);
            if (order is null)
                return false;

            var newStatusId = request.NewStatus.Id;

            order.OrderStatusId = newStatusId;

            await _orderRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            if (newStatusId == OrderStatus.CancelledByBuyer.Id || newStatusId == OrderStatus.CancelledByStore.Id)
                await SendOrderCancelledCommand(request.OrderId);

            return true;
        }

        private async Task SendOrderCancelledCommand(string orderId)
        {
            var orderItems=new Dictionary<int,int>(); // productId, quantity

            var order = await _orderRepository.GetByIdAsync(Guid.Parse(orderId), i => i.OrderItems, i => i.Buyer);
            foreach (var item in order.OrderItems)      
                orderItems.Add(item.ProductId, item.Units);
            
            var command = new OrderCancelledCommand();
            command.OrderId = orderId;
            command.Items = orderItems;

            await _bus.Send(command);
        }
    }
}

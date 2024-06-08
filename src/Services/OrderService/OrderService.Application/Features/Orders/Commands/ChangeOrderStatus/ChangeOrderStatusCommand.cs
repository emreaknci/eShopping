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

        public ChangeOrderStatusCommandHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<bool> Handle(ChangeOrderStatusCommand request, CancellationToken cancellationToken)
        {
            Order order = await _orderRepository.GetSingleAsync(o => o.Id.ToString() == request.OrderId);
            if (order is null)
                return false;

            order.OrderStatusId = request.NewStatus.Id;

            await _orderRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            return true;
        }
    }
}

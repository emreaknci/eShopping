using MediatR;
using OrderService.Application.Features.Orders.Queries.ViewModels;
using OrderService.Application.Interfaces.Repositories;
using OrderService.Domain.AggregateModels.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Features.Orders.Queries.GetLatestOrders
{
    public class GetLatestOrdersQueryHandler : IRequestHandler<GetLatestOrdersQuery, LatestOrdersViewModel>
    {
        private readonly IOrderRepository _orderRepository;

        public GetLatestOrdersQueryHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public Task<LatestOrdersViewModel> Handle(GetLatestOrdersQuery request, CancellationToken cancellationToken)
        {
            var latestOrders = _orderRepository.GetLatestOrders(request.Count);

            List<OrderViewModel> result = new();
            foreach (var order in latestOrders)
            {
                result.Add(new OrderViewModel
                {
                    BuyerName = order.Buyer.FullName,
                    OrderDate = order.OrderDate,
                    OrderId = order.Id,
                    OrderStatus = order.OrderStatusId,
                    Total = order.OrderItems.Sum(x => x.UnitPrice * x.Units)
                });
            }

            return Task.FromResult(new LatestOrdersViewModel
            {
                Orders = result
            });
        }
    }
}

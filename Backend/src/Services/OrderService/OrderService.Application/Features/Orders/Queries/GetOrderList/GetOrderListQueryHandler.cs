using AutoMapper;
using MediatR;
using OrderService.Application.Features.Orders.Queries.ViewModels;
using OrderService.Application.Interfaces.Repositories;

namespace OrderService.Application.Features.Orders.Queries.GetOrderList
{
    public class GetOrderListQueryHandler : IRequestHandler<GetOrderListQuery, OrderListViewModel>
    {
        private readonly IOrderRepository _orderRepository;

        public GetOrderListQueryHandler(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
        }

        public Task<OrderListViewModel> Handle(GetOrderListQuery request, CancellationToken cancellationToken)
        {
            var orders = _orderRepository.GetOrders(request.DateOption, request.OrderStatus, request.SearchText);

            int totalCount = orders.Count();
            int totalPages = (int)Math.Ceiling(totalCount / (double)request.PageSize);
        
            orders = orders.Skip(request.PageSize * (request.Page - 1)).Take(request.PageSize);

            List<OrderListDto> orderListDtos = new();
            foreach (var order in orders)
            {
                orderListDtos.Add(new OrderListDto
                {
                    OrderDate = order.OrderDate,
                    OrderId = order.Id,
                    OrderStatus = order.OrderStatusId,
                });
            }


            OrderListViewModel viewModel = new()
            {
                Orders = orderListDtos,
                Page = request.Page,
                PageSize = orderListDtos.Count,
                TotalCount = totalCount,
                TotalPages = totalPages
            };

            return Task.FromResult(viewModel);
        }

    }
}

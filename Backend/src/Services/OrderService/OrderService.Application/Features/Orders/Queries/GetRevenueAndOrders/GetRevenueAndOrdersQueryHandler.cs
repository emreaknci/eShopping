using MediatR;
using OrderService.Application.Features.Orders.Queries.ViewModels;
using OrderService.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Features.Orders.Queries.GetRevenueAndOrders
{
    public class GetRevenueAndOrdersQueryHandler : IRequestHandler<GetRevenueAndOrdersQuery, RevenueAndOrdersViewModel>
    {
        private readonly IOrderRepository _orderRepository;

        public GetRevenueAndOrdersQueryHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public Task<RevenueAndOrdersViewModel> Handle(GetRevenueAndOrdersQuery request, CancellationToken cancellationToken)
        {
            RevenueAndOrdersViewModel viewModel = new();
            viewModel.TotalRevenue = _orderRepository.CalculateTotalOrderRevenue();
            viewModel.TodayRevenue = _orderRepository.CalculateLatestOrderRevenue(request.DaysAgo);
            viewModel.TotalOrders = _orderRepository.CalculateTotalOrderCount();
            viewModel.TodayOrders = _orderRepository.CalculateLatestOrderCount(request.DaysAgo);

            return Task.FromResult(viewModel);
        }
    }
}

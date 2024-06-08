using MediatR;
using OrderService.Application.Features.Orders.Queries.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Features.Orders.Queries.GetRevenueAndOrders
{
    public class GetRevenueAndOrdersQuery : IRequest<RevenueAndOrdersViewModel>
    {
        public int DaysAgo { get; set; }

        public GetRevenueAndOrdersQuery(int daysAgo)
        {
            DaysAgo = daysAgo;
        }
    }
}

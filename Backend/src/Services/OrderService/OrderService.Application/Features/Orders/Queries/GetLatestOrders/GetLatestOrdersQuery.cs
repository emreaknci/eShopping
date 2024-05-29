using MediatR;
using OrderService.Application.Features.Orders.Queries.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Features.Orders.Queries.GetLatestOrders
{
    public class GetLatestOrdersQuery:IRequest<LatestOrdersViewModel>
    {
        public int Count { get; set; }

        public GetLatestOrdersQuery(int count)
        {
            Count = count;
        }
    }
}

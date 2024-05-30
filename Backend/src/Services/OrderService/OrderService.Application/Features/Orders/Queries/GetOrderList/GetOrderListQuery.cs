using MediatR;
using OrderService.Application.Features.Orders.Queries.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Features.Orders.Queries.GetOrderList
{
    public class GetOrderListQuery:IRequest<OrderListViewModel>
    {
        public GetOrderListQuery(int page, int pageSize)
        {
            Page = page;
            PageSize = pageSize;
        }

        public int Page { get; set; } 
        public int PageSize { get; set; }

        public int? OrderStatus { get; set; }
        public string? SearchText { get; set; }
        public DateOption? DateOption { get; set; }
    }

    public enum DateOption
    {
        AllTime,
        LastMonth,
        Last3Months,
        Last6Months,
        LastYear,
        Last2Years,
        Last5Years
    }
}

using MediatR;
using OrderService.Application.Features.Orders.Queries.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Features.Orders.Queries.GetOrderDetailById
{
    public class GetOrderDetailsQuery : IRequest<OrderDetailViewModel>
    {
        public Guid OrderId { get; set; }

        public GetOrderDetailsQuery(Guid orderId)
        {
            OrderId = orderId;
        }
    }
}

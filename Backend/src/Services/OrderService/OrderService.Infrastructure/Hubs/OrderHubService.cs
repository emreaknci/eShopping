using Microsoft.AspNetCore.SignalR;
using OrderService.Application.Interfaces.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Infrastructure.Hubs
{
    public class OrderHubService : IOrderHubService
    {
        private readonly IHubContext<OrderHub> _hubContext;

        public OrderHubService(IHubContext<OrderHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task OrderPaymentFailedMessageAsync(string buyerId)
        => await _hubContext.Clients.All.SendAsync(ReceiveFunctionNames.OrderPaymentFailedMessage, buyerId);

        public Task OrderPaymentSuccededMessageAsync(string buyerId)
        => _hubContext.Clients.All.SendAsync(ReceiveFunctionNames.OrderPaymentSuccededMessage, buyerId);
    }

    public class OrderHub : Hub
    {
    }
}

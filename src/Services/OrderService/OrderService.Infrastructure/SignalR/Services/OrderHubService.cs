using Microsoft.AspNetCore.SignalR;
using OrderService.Application.Interfaces.Hubs;
using OrderService.Infrastructure.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Infrastructure.SignalR.Services
{
    public class OrderHubService : IOrderHubService
    {
        private readonly IHubContext<OrderHub> _hubContext;

        public OrderHubService(IHubContext<OrderHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task OrderPaymentFailedMessageAsync(string buyerId)
        {
            var client=ClientSource.Clients.FirstOrDefault(x => x.UserId == buyerId);
            if (client == null)
                return;

            await _hubContext.Clients.Client(client.ConnectionId).SendAsync(ReceiveFunctionNames.OrderPaymentFailedMessage);

        }
        public async Task OrderPaymentSuccededMessageAsync(string buyerId)
        {
            var client = ClientSource.Clients.FirstOrDefault(x => x.UserId == buyerId);
            if (client == null)
                return;
            await _hubContext.Clients.Client(client.ConnectionId).SendAsync(ReceiveFunctionNames.OrderPaymentSuccededMessage);
        }

    }
}

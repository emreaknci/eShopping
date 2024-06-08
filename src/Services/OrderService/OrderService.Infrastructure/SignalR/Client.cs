using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Infrastructure.SignalR
{
    public class Client
    {
        public string ConnectionId { get; set; }    
        public string UserId { get; set; }

        public Client(string connectionId, string userId)
        {
            ConnectionId = connectionId;
            UserId = userId;
        }
    }

    public static class ClientSource
    {
        public static List<Client> Clients { get; } = new();
    }
}

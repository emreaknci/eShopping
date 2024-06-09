using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.MassTransit.Commands
{
    public class OrderCancelledCommand
    {
        public string OrderId { get; set; }
        public Dictionary<int, int> Items { get; set; } // ProductId, Quantity
    }
}

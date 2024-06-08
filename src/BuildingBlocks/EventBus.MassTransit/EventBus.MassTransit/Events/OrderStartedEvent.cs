using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.MassTransit.Events
{
    public class OrderStartedEvent
    {
        public string OrderId { get; set; }
        public string BuyerId { get; set; }
        public string BuyerEmail { get; set; } // For email notification
        public bool Succeeded { get; set; }

        public Dictionary<int, int> Items { get; set; }

    }
}

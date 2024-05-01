﻿using EventBus.Base.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.IntegrationEvents
{
    public class OrderStartedIntegrationEvent : IntegrationEvent
    {
        public string OrderId { get; set; }
        public Dictionary<int,int> OrderItems { get; set; } // ProductId, Quantity

        public OrderStartedIntegrationEvent(string orderId,  Dictionary<int, int> orderItems)
        {
            OrderId = orderId;
            OrderItems = orderItems;
        }

    }
}

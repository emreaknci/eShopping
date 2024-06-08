﻿using EventBus.Base.Abstraction;
using EventBus.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EventBus.RabbitMQ;
using EventBus.AzureServiceBus;

namespace EventBus.Factory
{
    public static class EventBusFactory
    {
        public static IEventBus Create(EventBusConfig config, IServiceProvider serviceProvider)
        {
            return config.EventBusType switch
            {
                EventBusType.RabbitMQ => new EventBusRabbitMQ(config, serviceProvider),
                EventBusType.AzureServiceBus => new EventBusAzureServiceBus(config, serviceProvider),
                _ => new EventBusRabbitMQ(config, serviceProvider)
            };
        }
    }
}

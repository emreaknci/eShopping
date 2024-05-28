using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.MassTransit
{
    public static class EventBusConstants
    {
        public const string Uri = "amqp://localhost";
        public const string Username = "guest";
        public const string Password = "guest";

        public const string OrderServiceQueueName = "order.service";
        public const string BasketServiceQueueName = "basket.service";
        public const string CatalogServiceQueueName = "catalog.service";
        public const string PaymentServiceQueueName = "payment.service";
        public const string NotificationServiceQueueName = "notification.service";
    }
}

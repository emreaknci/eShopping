using OrderService.Domain.Exceptions;
using OrderService.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Domain.AggregateModels.OrderAggregate
{
    public class OrderStatus:Enumeration
    {

        public static OrderStatus PaymentPending = new OrderStatus(1, nameof(PaymentPending).ToLowerInvariant());
        public static OrderStatus PaymentFailed = new OrderStatus(2, nameof(PaymentFailed).ToLowerInvariant());
        public static OrderStatus PaymentSucceeded = new OrderStatus(3, nameof(PaymentSucceeded).ToLowerInvariant());
        public static OrderStatus Preparing = new OrderStatus(4, nameof(Preparing).ToLowerInvariant());
        public static OrderStatus Shipped = new OrderStatus(5, nameof(Shipped).ToLowerInvariant());
        public static OrderStatus Delivered = new OrderStatus(6, nameof(Delivered).ToLowerInvariant());
        public static OrderStatus CancelledByBuyer = new OrderStatus(7, nameof(CancelledByBuyer).ToLowerInvariant());
        public static OrderStatus CancelledByStore = new OrderStatus(8, nameof(CancelledByStore).ToLowerInvariant());


        public OrderStatus(int id, string name) : base(id, name)
        {
        }
        public static IEnumerable<OrderStatus> List() =>
            new[] { PaymentPending, PaymentFailed, PaymentSucceeded, Preparing, Shipped,Delivered, CancelledByBuyer,CancelledByStore };

        public static OrderStatus FromName(string name)
        {
            var state= List()
                .SingleOrDefault(s => String.Equals(s.Name, name, StringComparison.CurrentCultureIgnoreCase));
            return state ?? throw new OrderingDomainException($"Possible values for OrderStatus: {String.Join(",", List().Select(s => s.Name))}");
        }

        public static OrderStatus From(int id)
        {
            var state = List().SingleOrDefault(s => s.Id == id);
            return state ?? throw new OrderingDomainException($"Possible values for OrderStatus: {String.Join(",", List().Select(s => s.Name))}");
        }
    }
}

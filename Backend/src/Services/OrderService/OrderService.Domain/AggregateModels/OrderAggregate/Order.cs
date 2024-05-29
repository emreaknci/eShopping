using OrderService.Domain.AggregateModels.BuyerAggregate;
using OrderService.Domain.Events;
using OrderService.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Domain.AggregateModels.OrderAggregate
{
    public class Order : BaseEntity, IAggregateRoot
    {
        public DateTime OrderDate { get; private set; }
        public Guid? BuyerId { get; set; }
        public Buyer Buyer { get; private set; }

        public int OrderStatusId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public Address Address { get; private set; }

        public int NumberOfInstallments { get; private set; }
        private readonly List<OrderItem> _orderItems;
        public IReadOnlyCollection<OrderItem> OrderItems => _orderItems;

        public Guid? PaymentMethodId { get; set; }

        protected Order()
        {
            Id = Guid.NewGuid();
            _orderItems = new List<OrderItem>();
        }

        public Order(string userId, string userName, Address address, int cardTypeId, string cardNumber, string cardSecurityNumber, string cardHolderName, DateTime cardExpiration, int numberOfInstallments) : this()
        {
            OrderStatusId = OrderStatus.Submitted.Id;
            OrderDate = DateTime.UtcNow;
            Address = address;
            NumberOfInstallments = numberOfInstallments;

            AddOrderStartedDomainEvent(userId, userName, cardTypeId, cardNumber, cardSecurityNumber, cardHolderName, cardExpiration);
        }

        public void AddOrderStartedDomainEvent(string userId, string userName, int cardTypeId, string cardNumber, string cardSecurityNumber, string cardHolderName, DateTime cardExpiration)
        {
            var orderStartedDomainEvent = new OrderStartedDomainEvent(this, userId, userName, cardTypeId, cardNumber, cardSecurityNumber, cardHolderName, cardExpiration);

            this.AddDomainEvent(orderStartedDomainEvent);
        }

        public void AddOrderItem(int productId, string productName, decimal unitPrice, string picureUrl, int units = 1)
        {

            //validation
            var orderItem = new OrderItem(productId, productName, unitPrice, picureUrl, units);
            orderItem.OrderId = Id;

            _orderItems.Add(orderItem);
        }

        public void SetBuyerId(Guid id)
        {
            BuyerId = id;
        }
        public void SetPaymentMethodId(Guid id)
        {
            PaymentMethodId = id;
        }

    }
}

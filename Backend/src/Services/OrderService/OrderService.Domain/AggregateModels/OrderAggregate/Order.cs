﻿using OrderService.Domain.AggregateModels.BuyerAggregate;
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
        public int Quantity { get; private set; }
        public string Description { get; private set; }
        public Guid? BuyerId { get; private set; }
        public int UserId { get; private set; }
        public Buyer Buyer { get; private set; }

        private int _orderStatusId;
        public OrderStatus OrderStatus { get; private set; }
        public Address Address { get; private set; }

        private readonly List<OrderItem> _orderItems;
        public IReadOnlyCollection<OrderItem> OrderItems => _orderItems;

        public Guid? PaymentMethodId { get; set; }

        protected Order()
        {
            Id = Guid.NewGuid();
            _orderItems = new List<OrderItem>();
        }

        public Order(int userId, string userName, Address address, int cardTypeId, string cardNumber, string cardSecurityNumber, string cardHolderName, DateTime cardExpiration, Guid? paymentMethodId, Guid? buyerId = null) : this()
        {
            UserId = userId;
            BuyerId = buyerId;
            _orderStatusId = OrderStatus.Submitted.Id;
            OrderDate = DateTime.Now;
            Address = address;
            PaymentMethodId = paymentMethodId;

            AddOrderStartedDomainEvent(userId, userName, cardTypeId, cardNumber, cardSecurityNumber, cardHolderName, cardExpiration);
        }

        private void AddOrderStartedDomainEvent(int userId, string userName, int cardTypeId, string cardNumber, string cardSecurityNumber, string cardHolderName, DateTime cardExpiration)
        {
            var orderStartedDomainEvent = new OrderStartedDomainEvent(this, userId, userName, cardTypeId, cardNumber, cardSecurityNumber, cardHolderName, cardExpiration);

            this.AddDomainEvent(orderStartedDomainEvent);
        }

        public void AddOrderItem(int productId, string productName, decimal unitPrice, string picureUrl, int units = 1)
        {

            //validation
            var orderItem = new OrderItem(productId, productName, unitPrice, picureUrl, units);

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

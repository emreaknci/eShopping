using OrderService.Domain.Events;
using OrderService.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Domain.AggregateModels.BuyerAggregate
{
    public class Buyer : BaseEntity, IAggregateRoot
    {
        public string UserId { get; set; }
        public string FullName { get; set; }

        private List<PaymentMethod> _paymentMethods;
        public IEnumerable<PaymentMethod> PaymentMethods => _paymentMethods.AsReadOnly();

        protected Buyer()
        {
            _paymentMethods = new List<PaymentMethod>();
        }

        public Buyer(string userId, string fullName) : this()
        {
            UserId = userId;
            FullName = fullName ?? throw new ArgumentNullException(nameof(fullName));
        }

        public PaymentMethod VerifyOrAddPaymentMethod(int cardTypeId, string alias, string cardNumber, string securityNumber, string cardHolderName, DateTime expiration, Guid orderId)
        {
            var existingPayment = _paymentMethods.SingleOrDefault(p => p.CardHolderName == cardHolderName); // TODO: actually cardHolderName equals to cardNumber. There's a mess here. Find and fix it.

            if (existingPayment != null)
            {
                AddDomainEvent(new BuyerAndPaymentMethofVerifiedDomainEvent(this, existingPayment, orderId));
                return existingPayment;
            }

            var payment = new PaymentMethod(alias, cardNumber, securityNumber, cardHolderName, expiration, cardTypeId);

            _paymentMethods.Add(payment);

            AddDomainEvent(new BuyerAndPaymentMethofVerifiedDomainEvent(this, payment, orderId));

            return payment;
        }

        public override bool Equals(object obj)
        {
            return base.Equals(obj) ||
                (obj is Buyer buyer &&
                Id.Equals(buyer.Id) &&
                FullName == buyer.FullName);
            ;
        }
    }
}

using MediatR;
using OrderService.Application.Interfaces.Repositories;
using OrderService.Domain.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.DomainEventHandlers
{
    public class UpdateOrderWhenBuyerAndPaymentMethodVerifiedDomainEventHandler : INotificationHandler<BuyerAndPaymentMethofVerifiedDomainEvent>
    {

        private readonly IOrderRepository _orderRepository;

        public UpdateOrderWhenBuyerAndPaymentMethodVerifiedDomainEventHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task Handle(BuyerAndPaymentMethofVerifiedDomainEvent notification, CancellationToken cancellationToken)
        {
            var orderToUpdate = await _orderRepository.GetByIdAsync(notification.OrderId);

            orderToUpdate.SetBuyerId(notification.Buyer.Id);
            orderToUpdate.SetPaymentMethodId(notification.PaymentMethod.Id);

        }
    }
}

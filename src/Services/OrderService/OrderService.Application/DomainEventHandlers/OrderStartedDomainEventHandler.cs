﻿using MediatR;
using OrderService.Application.Interfaces.Repositories;
using OrderService.Domain.AggregateModels.BuyerAggregate;
using OrderService.Domain.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.DomainEventHandlers
{
    public class OrderStartedDomainEventHandler : INotificationHandler<OrderStartedDomainEvent>
    {
        private readonly IBuyerRepository _buyerRepository;

        public OrderStartedDomainEventHandler(IBuyerRepository buyerRepository)
        {
            _buyerRepository = buyerRepository;
        }

        public async Task Handle(OrderStartedDomainEvent orderStartedEvent, CancellationToken cancellationToken)
        {
            var cardTypeId = (orderStartedEvent.CardTypeId != 0) ? orderStartedEvent.CardTypeId : 1;

            var buyer = await _buyerRepository.GetSingleAsync(i => i.UserId == orderStartedEvent.UserId, i => i.PaymentMethods);

            if (buyer == null)           
                buyer = new Buyer(orderStartedEvent.UserId, orderStartedEvent.UserName);
            

            buyer.VerifyOrAddPaymentMethod(cardTypeId, $"Payment Method on {DateTime.UtcNow}", orderStartedEvent.CardNumber, orderStartedEvent.CardSecurityNumber, orderStartedEvent.CardHolderName, orderStartedEvent.CardExpiration, orderStartedEvent.Order.Id);

            if (buyer == null)
            {
                buyer = new Buyer(orderStartedEvent.UserId, orderStartedEvent.UserName);
                await _buyerRepository.AddAsync(buyer);
            }
            else
                _buyerRepository.Update(buyer);

            await _buyerRepository.UnitOfWork.SaveEntitiesAsync();

        }
    }
}

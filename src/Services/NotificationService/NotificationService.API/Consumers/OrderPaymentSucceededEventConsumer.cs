﻿using EventBus.MassTransit.Events;
using MassTransit;
using NotificationService.API.Services;

namespace NotificationService.API.Consumers
{
    public class OrderPaymentSucceededEventConsumer : IConsumer<OrderPaymentSucceeded>
    {
        private readonly IMailService _mailService;

        public OrderPaymentSucceededEventConsumer(IMailService mailService)
        {
            _mailService = mailService;
        }

        public async Task Consume(ConsumeContext<OrderPaymentSucceeded> context)
        {
           await _mailService.SendOrderCreatedMailAsync(context.Message.BuyerEmail, context.Message.OrderId);
        }
    }
}

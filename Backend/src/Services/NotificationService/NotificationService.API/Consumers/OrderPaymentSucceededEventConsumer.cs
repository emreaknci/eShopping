using EventBus.MassTransit.Events;
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

        public Task Consume(ConsumeContext<OrderPaymentSucceeded> context)
        {
            _mailService.SendOrderCreatedMailAsync("emreakinci696@gmail.com", context.Message.OrderId); // TODO: Get email from user service by user id
            return Task.CompletedTask;
        }
    }
}

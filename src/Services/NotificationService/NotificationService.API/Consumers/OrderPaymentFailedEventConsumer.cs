using EventBus.MassTransit.Events;
using MassTransit;

namespace NotificationService.API.Consumers
{
    public class OrderPaymentFailedEventConsumer:IConsumer<OrderPaymentFailed>
    {
        public Task Consume(ConsumeContext<OrderPaymentFailed> context)
        {
            return Task.CompletedTask;
        }
    }
}

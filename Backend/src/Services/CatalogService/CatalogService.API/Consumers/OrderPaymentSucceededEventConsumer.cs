using EventBus.MassTransit.Events;
using MassTransit;

namespace CatalogService.API.Consumers
{
    public class OrderPaymentSucceededEventConsumer : IConsumer<OrderPaymentSucceeded>
    {
        public Task Consume(ConsumeContext<OrderPaymentSucceeded> context)
        {
            
            return Task.CompletedTask;
        }
    }

}

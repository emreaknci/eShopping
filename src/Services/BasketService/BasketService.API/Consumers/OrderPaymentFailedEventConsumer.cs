using EventBus.MassTransit.Events;
using MassTransit;

namespace BasketService.API.Consumers
{
    public class OrderPaymentFailedEventConsumer : IConsumer<OrderPaymentFailed>
    {
        public Task Consume(ConsumeContext<OrderPaymentFailed> context)
        {
            Console.WriteLine(context.Message.OrderId + " siparişinin ödemesi alınamadı. => sepet hala dolu!");
            return Task.CompletedTask;
        }
    }
}

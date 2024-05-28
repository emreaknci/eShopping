using EventBus.MassTransit.Events;
using MassTransit;

namespace PaymentService.API.Consumers
{
    public class OrderStartedEventConsumer : IConsumer<OrderStartedEvent>
    {
        private readonly IConfiguration configuration;

        public OrderStartedEventConsumer(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task Consume(ConsumeContext<OrderStartedEvent> context)
        {
            string keyword = "PaymentSuccess";
            bool success = configuration.GetValue<bool>(keyword);
            //var success = new Random().Next(0, 2) == 1;

            var message = context.Message;

            await Console.Out.WriteLineAsync($"\n#{message.OrderId} payment being received...");
            await SendPaymentStatus(context, false);
        }

        public async Task SendPaymentStatus(ConsumeContext<OrderStartedEvent> context, bool success)
        {
            Console.WriteLine($"Payment for order with id {context.Message.OrderId} was {(success ? "successful" : "unsuccessful")}\n");

            if (success)
            {
                var succeeded = new OrderPaymentSucceeded()
                {
                    OrderId = context.Message.OrderId,
                    BuyerId= context.Message.BuyerId,
                };
                await context.Publish(succeeded);
            }

            else
            {
                Dictionary<int, int> items = new Dictionary<int, int>();
                foreach (var item in context.Message.Items)
                {
                    items.Add(item.Key, item.Value);
                }
                OrderPaymentFailed failed = new OrderPaymentFailed(context.Message.OrderId, "Payment failed", items,context.Message.BuyerId);            
                await context.Publish(failed);
            }

        }
    }
}

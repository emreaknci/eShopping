using BasketService.API.Core.Application.Repository;
using EventBus.MassTransit.Events;
using MassTransit;

namespace BasketService.API.Consumers
{
    public class OrderPaymentSucceededEventConsumer : IConsumer<OrderPaymentSucceeded>
    {
        private readonly IBasketRepository _basketRepository;

        public OrderPaymentSucceededEventConsumer(IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
        }

        public async Task Consume(ConsumeContext<OrderPaymentSucceeded> context)
        {
            Console.WriteLine(context.Message.OrderId + "siparişinin ödemesi alındı => sepet temizlendi");

            await _basketRepository.DeleteBasketAsync(context.Message.BuyerId);
        }
    }
}

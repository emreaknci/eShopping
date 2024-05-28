using Consul;
using EventBus.MassTransit.Commands;
using EventBus.MassTransit.Events;
using MassTransit;
using MassTransit.SagaStateMachine;
using MediatR;
using OrderService.Application.Features.Orders.Commands.CreateOrder;
using OrderService.Domain.Models;

namespace OrderService.API.Consumers
{
    public class OrderCreatedCommandConsumer : IConsumer<OrderCreatedCommand>
    {
        private readonly IMediator _mediator;

        public OrderCreatedCommandConsumer(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task Consume(ConsumeContext<OrderCreatedCommand> context)
        {
            var message = context.Message;

            List<Domain.Models.BasketItem> basketItems = new();
            foreach (var item in message.Basket.Items)
            {
                basketItems.Add(new Domain.Models.BasketItem()
                {
                    Id = item.Id,
                    OldUnitPrice = item.OldUnitPrice,
                    PictureUrl = item.PictureUrl,
                    ProductId = item.ProductId,
                    UnitPrice = item.UnitPrice,
                    ProductName = item.ProductName,
                    Quantity = item.Quantity
                });
            }

            var createdOrderCommand = new CreateOrderCommand(
            basketItems, message.UserId,
            message.UserName, message.ShippingAddress.City, message.ShippingAddress.Street, message.ShippingAddress.State,
            message.ShippingAddress.Country, message.ShippingAddress.ZipCode, message.PaymentDetails.CardNumber,
            message.PaymentDetails.CardHolderName, message.PaymentDetails.CardExpiration,
            message.PaymentDetails.CardSecurityNumber, message.PaymentDetails.CardTypeId);


            await _mediator.Send(createdOrderCommand);
        }
    }

}

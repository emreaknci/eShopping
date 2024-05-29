using EventBus.MassTransit;
using EventBus.MassTransit.Events;
using MassTransit;
using MediatR;
using Microsoft.VisualBasic;
using OrderService.Application.Interfaces.Repositories;
using OrderService.Domain.AggregateModels.OrderAggregate;
using System.Globalization;


namespace OrderService.Application.Features.Orders.Commands.CreateOrder
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, bool>
    {
        private readonly IOrderRepository _orderRepository;
        private IPublishEndpoint _publishEndpoint;

        public CreateOrderCommandHandler(IOrderRepository orderRepository, IPublishEndpoint publishEndpoint)
        {
            _orderRepository = orderRepository;
            _publishEndpoint = publishEndpoint;
        }

        public async Task<bool> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var addr = new Address(request.Street, request.City, request.State, request.Country, request.ZipCode);
            Order dbOrder = new(
                request.UserId,
                request.UserName,
                addr,
                request.CardTypeId,
                request.CardNumber,
                request.CardSecurityNumber,
                request.CardHolderName,
                request.CardExpiration,
                request.NumberOfInstallments
                );
                
            request.OrderItems.ToList().ForEach(i => dbOrder.AddOrderItem(i.ProductId, i.ProductName, i.UnitPrice, i.PictureUrl, i.Units));
            await _orderRepository.AddAsync(dbOrder);
            await _orderRepository.UnitOfWork.SaveEntitiesAsync();

            var orderItems = dbOrder.OrderItems.ToDictionary(i => i.ProductId, i => i.Units);

            await _publishEndpoint.Publish<OrderStartedEvent>(new OrderStartedEvent()
            {
                OrderId = dbOrder.Id.ToString(),
                BuyerId = request.UserId,
                Items = orderItems,
                Succeeded = true
            });

            return true;
        }

    }
}

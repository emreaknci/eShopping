using MediatR;
using OrderService.Application.Interfaces.Repositories;
using OrderService.Domain.AggregateModels.OrderAggregate;


namespace OrderService.Application.Features.Orders.Commands.CreateOrder
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, bool>
    {
        private readonly IOrderRepository _orderRepository;

        public CreateOrderCommandHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
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
                null);

            request.OrderItems.ToList().ForEach(i => dbOrder.AddOrderItem(i.ProductId, i.ProductName, i.UnitPrice, i.PictureUrl, i.Units));

            await _orderRepository.AddAsync(dbOrder);
            await _orderRepository.UnitOfWork.SaveEntitiesAsync();

            var orderItems = dbOrder.OrderItems.ToDictionary(i => i.ProductId, i => i.Units);

           // TODO: Publish the event to the bus
            return true;
        }

    }
}

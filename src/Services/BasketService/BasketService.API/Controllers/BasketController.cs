using BasketService.API.Core.Application.Repository;
using BasketService.API.Core.Application.Services;
using BasketService.API.Core.Domain.Models;
using EventBus.MassTransit;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EventBusBasketItem = EventBus.MassTransit.Commands.BasketItem;
using EventBusAddress = EventBus.MassTransit.Commands.Address;
using EventBusPaymentDetails = EventBus.MassTransit.Commands.PaymentDetails;
using EventBusCustomerBasket = EventBus.MassTransit.Commands.CustomerBasket;
using BasketService.API.Utils.Results;

namespace BasketService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IIdentityService _identityService;
        private readonly ILogger<BasketController> _logger;
        private readonly ISendEndpoint _bus;

        public BasketController(IBasketRepository basketRepository, IIdentityService identityService,
             ILogger<BasketController> logger)

        {
            _basketRepository = basketRepository;
            _identityService = identityService;
            _logger = logger;

            var bus = BusConfigurator.ConfigureBus();
            var sendToUri = new Uri($"{EventBusConstants.Uri}/{EventBusConstants.OrderServiceQueueName}");
            _bus = bus.GetSendEndpoint(sendToUri).Result;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Basket Service is Up and Running");
        }

        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetBasketByIdAsync(string customerId)
        {
            var result = await _basketRepository.GetBasketAsync(customerId);

            return result.Success
                ? Ok(result)
                : NotFound(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddItemToBasketAsync([FromBody] BasketItem basketItem)
        {
            var userId = _identityService.GetUserId().ToString();

            var result = await _basketRepository.GetBasketAsync(userId);
            if (!result.Success)
                result.Data = new CustomerBasket(userId);

            result.Data.Items.Add(basketItem);

            result = await _basketRepository.UpdateBasketAsync(result.Data);
            return result.Success ? Ok(result) : BadRequest(result);
        }


        [HttpPut]
        public async Task<ActionResult<CustomerBasket>> UpdateBasketAsync([FromBody] CustomerBasket basket)
        {
            var result = await _basketRepository.UpdateBasketAsync(basket);

            return result.Success ? Ok(result) : BadRequest(result);
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> CheckoutAsync([FromBody] BasketCheckout basketCheckout)
        {
            var userId = basketCheckout.Buyer;

            var basketResult = await _basketRepository.GetBasketAsync(userId);
            if (!basketResult.Success)
                return BadRequest(basketResult);

            var userName = _identityService.GetUserName();
            var userEmail = _identityService.GetUserEmail();

            EventBus.MassTransit.Commands.OrderCreatedCommand orderCreatedCommand = CreateOrderCreatedCommand(basketCheckout, userId, basketResult, userName, userEmail);

            await _bus.Send(orderCreatedCommand);

            return Accepted();
        }


        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeleteBasketAsync(string customerId)
        {
            var result = await _basketRepository.DeleteBasketAsync(customerId);

            return result.Success ? Ok(result) : BadRequest(result);
        }

        private static EventBus.MassTransit.Commands.OrderCreatedCommand CreateOrderCreatedCommand(BasketCheckout basketCheckout, string userId, Result<CustomerBasket> basketResult, string userName, string userEmail)
        {
            EventBusAddress address = new(basketCheckout.ShippingAddress.City, basketCheckout.ShippingAddress.Street, basketCheckout.ShippingAddress.State, basketCheckout.ShippingAddress.Country, basketCheckout.ShippingAddress.ZipCode);

            List<EventBusBasketItem> eventBusBasketItems = new();
            foreach (var item in basketResult.Data.Items)
            {
                var eventBusBasketItem = new EventBusBasketItem(item.Id, item.ProductId, item.ProductName, item.UnitPrice, item.OldUnitPrice, item.Quantity, item.PictureUrl);
                eventBusBasketItems.Add(eventBusBasketItem);
            }
            EventBusCustomerBasket customerBasket = new(userId, eventBusBasketItems);

            var cardDetail = basketCheckout.PaymentDetails;
            EventBusPaymentDetails paymentDetails = new(cardDetail.CardNumber, cardDetail.CardHolderName, cardDetail.CardExpiration, cardDetail.CardSecurityNumber, cardDetail.CardTypeId, cardDetail.NumberOfInstallments);



            var orderCreatedCommand = new EventBus.MassTransit.Commands.OrderCreatedCommand(userId, userName, address, paymentDetails, basketCheckout.Buyer, customerBasket, userEmail);
            return orderCreatedCommand;
        }

    }
}

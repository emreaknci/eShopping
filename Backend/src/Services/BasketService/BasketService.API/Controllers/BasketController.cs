using BasketService.API.Core.Application.Repository;
using BasketService.API.Core.Application.Services;
using BasketService.API.Core.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        public BasketController(IBasketRepository basketRepository, IIdentityService identityService,
             ILogger<BasketController> logger)

        {
            _basketRepository = basketRepository;
            _identityService = identityService;
            _logger = logger;
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

            //var eventMessage = new OrderCreatedIntegrationEvent(userId, userName, basketCheckout.ShippingAddress, basketCheckout.PaymentDetails, basketCheckout.Buyer, basketResult.Data);

            // TODO: Publish the event to the message broker
  
            return Accepted();
        }

        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeleteBasketAsync(string customerId)
        {
            var result = await _basketRepository.DeleteBasketAsync(customerId);

            return result.Success ? Ok(result) : BadRequest(result);
        }


    }
}

using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderService.Application.Features.Orders.Queries.GetLatestOrders;
using OrderService.Application.Features.Orders.Queries.GetOrderDetailById;
using OrderService.Application.Features.Orders.Queries.GetOrderList;
using OrderService.Application.Features.Orders.Queries.GetRevenueAndOrders;

namespace OrderService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrderController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetailsById(Guid id)
        {
            var query = new GetOrderDetailsQuery(id);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("get-revenue-and-orders")]
        public async Task<IActionResult> GetRevenueAndOrders(int daysAgo)
        {
            var query = new GetRevenueAndOrdersQuery(daysAgo);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("get-latest-orders")]
        public async Task<IActionResult> GetLatestOrders(int count)
        {
            var query = new GetLatestOrdersQuery(count);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("get-orders")]
        public async Task<IActionResult> GetOrders(int page=1, int pageSize=10, int? orderStatus = null, string? searchText = null)
        {

            var query = new GetOrderListQuery(page, pageSize);

            if (orderStatus.HasValue)        
                query.OrderStatus = orderStatus.Value;
            
            if (searchText != null)           
                query.SearchText = searchText;
            
            var result = await _mediator.Send(query);
            return Ok(result);
        }

    }
}

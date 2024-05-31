using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using OrderService.Application.Interfaces.Hubs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OrderService.Infrastructure.SignalR.Hubs
{
    public class OrderHub : Hub
    {
        private readonly IOrderHubService _orderHubService;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IConfiguration _configuration;

        public OrderHub(IOrderHubService orderHubService, IHttpContextAccessor contextAccessor, IConfiguration configuration)
        {
            _orderHubService = orderHubService;
            _contextAccessor = contextAccessor;
            _configuration = configuration;
        }

        public override async Task OnConnectedAsync()
        {

            var userId = GetUserId();
            if (userId == null)
                return;

            var client = ClientSource.Clients.FirstOrDefault(c => c.UserId == userId);

            if (client == null)
            {
                client = new Client(Context.ConnectionId, userId);
                ClientSource.Clients.Add(client);
            }
            else
                client.ConnectionId = Context.ConnectionId;



            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var client = ClientSource.Clients.FirstOrDefault(c => c.ConnectionId == Context.ConnectionId);
            if (client != null)
                ClientSource.Clients.Remove(client);
            await base.OnDisconnectedAsync(exception);
        }

        private string GetUserId()
        {
            var token = _contextAccessor.HttpContext.Request.Query["access_token"];
            if (string.IsNullOrEmpty(token))
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["TokenSettings:SecurityKey"])),
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken).Claims;

            return claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        }
    }

}

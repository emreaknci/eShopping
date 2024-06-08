using BasketService.API.Core.Application.Repository;
using BasketService.API.Core.Domain.Models;
using BasketService.API.Utils.Results;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace BasketService.API.Infrastructure.Repository
{
    public class RedisBasketRepository : IBasketRepository
    {
        private readonly ILogger<RedisBasketRepository> _logger;
        private readonly IDatabase _database;
        private readonly ConnectionMultiplexer _redis;

        public RedisBasketRepository(ILoggerFactory loggerFactory, ConnectionMultiplexer redis)
        {
            _logger = loggerFactory.CreateLogger<RedisBasketRepository>();
            _redis = redis;
            _database = redis.GetDatabase();
        }
        public async Task<Result<bool>> DeleteBasketAsync(string buyerId)
        {
            var isDeleted = await _database.KeyDeleteAsync(buyerId);

            return isDeleted
                ? Result<bool>.SuccessResult(true)
                : Result<bool>.FailureResult("");
        }

        public async Task<Result<CustomerBasket>> GetBasketAsync(string buyerId)
        {
            var data = await _database.StringGetAsync(buyerId);

            if (data.IsNullOrEmpty) return Result<CustomerBasket>.FailureResult("Sepet boş!");

            return Result<CustomerBasket>.SuccessResult(JsonConvert.DeserializeObject<CustomerBasket>(data!)!);
        }

        public Result<IEnumerable<string>> GetUsers()
        {
            var server = GetServer();
            var data = server.Keys();

            return data.IsNullOrEmpty()
                ? Result<IEnumerable<string>>.FailureResult("")
                : Result<IEnumerable<string>>.SuccessResult(data.Select(k => k.ToString()));
        }

        public async Task<Result<CustomerBasket>> UpdateBasketAsync(CustomerBasket basket)
        {
            var created = await _database.StringSetAsync(basket.BuyerId, JsonConvert.SerializeObject(basket));

            if (!created)
            {
                _logger.LogInformation("Problem occur persisting the item.");
                return null;
            }

            _logger.LogInformation("Basket item persisted succesfully.");

            return await GetBasketAsync(basket.BuyerId);
        }

        private IServer GetServer()
        {
            var endpoint = _redis.GetEndPoints();
            return _redis.GetServer(endpoint.First());
        }
    }
}

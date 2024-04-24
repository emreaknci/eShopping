using BasketService.API.Core.Domain.Models;
using BasketService.API.Utils.Results;

namespace BasketService.API.Core.Application.Repository
{
    public interface IBasketRepository
    {
        Task<Result<CustomerBasket>> GetBasketAsync(string buyerId);
        Result<IEnumerable<string>> GetUsers();
        Task<Result<CustomerBasket>> UpdateBasketAsync(CustomerBasket basket);
        Task<Result<bool>> DeleteBasketAsync(string customerId);
    }
}

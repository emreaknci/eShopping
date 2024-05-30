namespace BasketService.API.Core.Application.Services
{
    public interface IIdentityService
    {
        string GetUserId();
        string GetUserName();
        string GetUserEmail();
    }
}

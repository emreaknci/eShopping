using IdentityService.API.Models;

namespace IdentityService.API.Utils.Security.JWT
{
    public interface ITokenHandler
    {
        AccessToken CreateAccessToken(User user);

    }
}

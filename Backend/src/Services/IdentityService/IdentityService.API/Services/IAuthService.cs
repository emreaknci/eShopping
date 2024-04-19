using IdentityService.API.Dtos;
using IdentityService.API.Models;
using IdentityService.API.Utils.Results;
using IdentityService.API.Utils.Security.JWT;

namespace IdentityService.API.Services
{
    public interface IAuthService
    {
        Task<Result<UserDto>> RegisterAsync(RegisterDto dto,Role role);
        Task<Result<AccessToken>> LoginAsync(LoginDto dto);
    }


}

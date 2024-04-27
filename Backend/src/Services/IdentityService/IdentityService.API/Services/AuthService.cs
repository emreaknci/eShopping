using IdentityService.API.Context;
using IdentityService.API.Dtos;
using IdentityService.API.Models;
using IdentityService.API.Utils.Results;
using IdentityService.API.Utils.Security.Hashing;
using IdentityService.API.Utils.Security.JWT;

namespace IdentityService.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        private readonly ITokenHandler _tokenHandler;

        public AuthService(IUserService userService, ITokenHandler tokenHandler)
        {
            _userService = userService;
            _tokenHandler = tokenHandler;
        }

        public async Task<Result<bool>> ChangePermission(int userId, Role role)
        {
            var result = await _userService.ChangePermission(userId, role);

            return result.Success
                ? Result<bool>.SuccessResult(true)
                : Result<bool>.FailureResult(result.Message);
        }

        public async Task<Result<AccessToken>> LoginAsync(LoginDto dto)
        {

            var userToCheck = await _userService.GetByEmailAsync(dto.Email);

            if (!userToCheck.Success)
                return Result<AccessToken>.FailureResult("Kullanıcı bulunamadı");

            if (userToCheck.Data.IsDeleted)
                return Result<AccessToken>.FailureResult("Kullanıcı bulunamadı");

            if (!userToCheck.Data.Status)
                return Result<AccessToken>.FailureResult("Hesabınız askıya alınmış. Lütfen bizimle iletişime geçin.");

            var checkPassword = !HashingHelper.VerifyPasswordHash(dto.Password!, userToCheck.Data.PasswordHash!, userToCheck.Data.PasswordSalt!);

            return checkPassword
                            ? Result<AccessToken>.FailureResult("Kullanıcı adı veya şifre hatalı")
                            : Result<AccessToken>.SuccessResult(_tokenHandler.CreateAccessToken(userToCheck.Data));
        }

        public async Task<Result<UserDto>> RegisterAsync(RegisterDto dto, Role role)
        {
            HashingHelper.CreatePasswordHash(dto.Password!, out var hash, out var salt);

            var createUserDto = new CreateUserDto
            {
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Role = role,
                PasswordHash = hash,
                PasswordSalt = salt
            };

            var result = await _userService.CreateUserAsync(createUserDto);

            if (!result.Success)
                return Result<UserDto>.FailureResult(result.Message);

            var userDto = new UserDto
            {
                Id = result.Data.Id,
                FirstName = result.Data.FirstName,
                LastName = result.Data.LastName,
                Email = result.Data.Email,
                Role = result.Data.Role,
                Status = result.Data.Status,
                IsDeleted = result.Data.IsDeleted
            };

            return Result<UserDto>.SuccessResult(userDto);
        }
    }


}

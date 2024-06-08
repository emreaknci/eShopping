using IdentityService.API.Dtos;
using IdentityService.API.Models;
using IdentityService.API.Utils.Results;

namespace IdentityService.API.Services
{
    public interface IUserService
    {
        Task<Result<User>> GetByIdAsync(int id);
        Task<Result<User>> GetByEmailAsync(string email);
        Task<Result<User>> CreateUserAsync(CreateUserDto dto);
        Task<Result<User>> UpdateUserAsync(UpdateUserDto dto);
        Task<Result<bool>> DeleteUserAsync(int id);
        Task<Result<UserDto>> ChangePassword(ChangePasswordDto dto);
        PaginatedResult<UserDto> GetUsersWithPagination(string searchText, int pageNumber = 1, int pageSize = 10);
        PaginatedResult<UserDto> GetUsersWithPaginationByRole(Role role, string searchText, int pageNumber = 1, int pageSize = 10);
        Result<List<UserDto>> GetAll();
        Result<List<UserDto>> GetAllByRole(Role role);

        Task<Result<bool>> ChangePermission(int userId, Models.Role role);
    }


}

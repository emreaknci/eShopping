using Consul;
using IdentityService.API.Context;
using IdentityService.API.Dtos;
using IdentityService.API.Models;
using IdentityService.API.Utils.Results;
using IdentityService.API.Utils.Security.Hashing;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace IdentityService.API.Services
{
    public class UserService : IUserService
    {
        private readonly IdentityDbContext _context;

        public UserService(IdentityDbContext context)
        {
            _context = context;
        }

        public async Task<Result<UserDto>> ChangePassword(ChangePasswordDto dto)
        {

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId);
            if (user == null)
                return Result<UserDto>.FailureResult("Kullanıcı bulunamadı");

            var checkPassword = !HashingHelper.VerifyPasswordHash(dto.OldPassword!, user.PasswordHash!, user.PasswordSalt!);

            if (checkPassword)
                return Result<UserDto>.FailureResult("Mevcut şifreniz hatalı");

            HashingHelper.CreatePasswordHash(dto.NewPassword!, out var hash, out var salt);

            user.PasswordHash = hash;
            user.PasswordSalt = salt;

            await _context.SaveChangesAsync();

            return Result<UserDto>.SuccessResult(new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role
            });
        }

        public async Task<Result<bool>> ChangePermission(int userId, Models.Role role)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            if (user == null)
                return Result<bool>.FailureResult("Kullanıcı bulunamadı");

            user.Role = role;
            await _context.SaveChangesAsync();

            return Result<bool>.SuccessResult(true);
        }

        public async Task<Result<User>> CreateUserAsync(CreateUserDto dto)
        {
            var checkUser = UserExists(dto.Email);

            if (checkUser.Result)
                return Result<User>.FailureResult("Bu e-posta adresi zaten kullanımda");

            var user = new User
            {
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Role = (Models.Role)dto.Role!,
                PasswordHash = dto.PasswordHash,
                PasswordSalt = dto.PasswordSalt
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return Result<User>.SuccessResult(user);
        }

        public async Task<Result<bool>> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return Result<bool>.FailureResult("Kullanıcı bulunamadı");

            user.IsDeleted = true;
            await _context.SaveChangesAsync();
            return Result<bool>.SuccessResult(true);
        }

        public Result<List<UserDto>> GetAll()
        {
            var users = _context.Users.Select(u => new UserDto
            {
                Id = u.Id,
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Role = u.Role
            }).ToList();


            if (!users.Any())
                return Result<List<UserDto>>.FailureResult("Kullanıcı bulunamadı");

            return Result<List<UserDto>>.SuccessResult(users);
        }

        public Result<List<UserDto>> GetAllByRole(Models.Role role)
        {
            var users = _context.Users.Where(u => u.Role == role)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Role = u.Role
                }).ToList();

            if (!users.Any())
                return Result<List<UserDto>>.FailureResult("Kullanıcı bulunamadı");

            return Result<List<UserDto>>.SuccessResult(users);
        }

        public async Task<Result<User>> GetByEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return Result<User>.FailureResult("Kullanıcı bulunamadı");

            return Result<User>.SuccessResult(user);
        }

        public async Task<Result<User>> GetByIdAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return Result<User>.FailureResult("Kullanıcı bulunamadı");

            return Result<User>.SuccessResult(user);
        }

        public PaginatedResult<UserDto> GetUsersWithPagination(string searchText, int pageNumber = 1, int pageSize = 10)
        {

            var query = _context.Users
                .Where(u => !u.IsDeleted);

            if (!string.IsNullOrEmpty(searchText))
            {
                query = query.Where(u =>
                           u.Email.Contains(searchText) ||
                           u.FirstName.Contains(searchText) ||
                           u.LastName.Contains(searchText));
            }

            var users = query.OrderBy(u => u.Id)
                             .Skip((pageNumber - 1) * pageSize)
                             .Take(pageSize)
                             .Select(u => new UserDto
                             {
                                 Id = u.Id,
                                 Email = u.Email,
                                 FirstName = u.FirstName,
                                 LastName = u.LastName,
                                 IsDeleted = u.IsDeleted,
                                 Status = u.Status,
                                 Role = u.Role
                             })
                             .ToList();

            if (!users.Any())
                return PaginatedResult<UserDto>.FailureResult("Kullanıcı bulunamadı");

            int totalCount = query.Count();
            return PaginatedResult<UserDto>.SuccessResult(users, pageNumber, pageSize, totalCount);
        }

        public PaginatedResult<UserDto> GetUsersWithPaginationByRole(Models.Role role, string searchText, int pageNumber = 1, int pageSize = 10)
        {
            var query = _context.Users
                .Where(u => u.Role == role && !u.IsDeleted);

            if (!string.IsNullOrEmpty(searchText))
            {
                query = query.Where(u =>
                    u.Email.Contains(searchText) ||
                    u.FirstName.Contains(searchText) ||
                    u.LastName.Contains(searchText));
            }

            var users = query.OrderBy(u => u.Id)
                             .Skip((pageNumber - 1) * pageSize)
                             .Take(pageSize)
                             .Select(u => new UserDto
                             {
                                 Id = u.Id,
                                 Email = u.Email,
                                 FirstName = u.FirstName,
                                 LastName = u.LastName,
                                 IsDeleted = u.IsDeleted,
                                 Status = u.Status,
                                 Role = u.Role
                             })
                             .ToList();

            if (!users.Any())
                return PaginatedResult<UserDto>.FailureResult("Kullanıcı bulunamadı");

            int totalCount = query.Count();
            return PaginatedResult<UserDto>.SuccessResult(users, pageNumber, pageSize, totalCount);
        }

        public async Task<Result<User>> UpdateUserAsync(UpdateUserDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == dto.UserId);

            if (user == null)
                return Result<User>.FailureResult("Kullanıcı bulunamadı");

            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.Role = (Models.Role)dto.Role!;

            await _context.SaveChangesAsync();
            return Result<User>.SuccessResult(user);
        }
        private async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }
    }


}

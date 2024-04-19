using IdentityService.API.Models;

namespace IdentityService.API.Dtos
{
    public record CreateUserDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public Role? Role { get; set; }
    }
}

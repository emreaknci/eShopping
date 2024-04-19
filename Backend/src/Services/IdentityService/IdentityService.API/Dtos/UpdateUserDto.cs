using IdentityService.API.Models;

namespace IdentityService.API.Dtos
{
    public record UpdateUserDto
    {
        public int UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public Role? Role { get; set; }
    }

    public record ChangePasswordDto
    {
        public int UserId { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}

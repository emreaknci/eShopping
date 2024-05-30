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

}

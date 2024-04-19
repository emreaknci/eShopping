using IdentityService.API.Models;

namespace IdentityService.API.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public Role? Role { get; set; }
        public bool Status { get; set; }
        public bool IsDeleted { get; set; }
    }
}

namespace IdentityService.API.Dtos
{
    public record ChangePasswordDto
    {
        public int UserId { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
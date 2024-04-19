namespace IdentityService.API.Utils.Security.JWT
{
    public class TokenSettings : ITokenSettings
    {
        public string? SecurityKey { get; set; }
        public string? Issuer { get; set; }
        public string? Audience { get; set; }
        public double AccessExpiration { get; set; }
    }
}

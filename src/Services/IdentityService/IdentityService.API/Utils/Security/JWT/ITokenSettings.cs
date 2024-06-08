namespace IdentityService.API.Utils.Security.JWT
{
    public interface ITokenSettings
    {
        string SecurityKey { get; set; }
        string Issuer { get; set; }
        string Audience { get; set; }
        double AccessExpiration { get; set; }
    }
}

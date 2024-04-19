namespace IdentityService.API.Utils.Security.JWT
{
    public class AccessToken
    {
        public string? Token { get; set; }
        public double Expires { get; set; }
    }
}

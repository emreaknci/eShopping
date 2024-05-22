namespace CommentService.Settings
{
    public interface ITokenSettings
    {
        string SecurityKey { get; set; }
        string Issuer { get; set; }
        string Audience { get; set; }
        double AccessExpiration { get; set; }
    }
}

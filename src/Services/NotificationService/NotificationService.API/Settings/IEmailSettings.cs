namespace NotificationService.API.Settings
{
    public interface IEmailSettings
    {
        string Host { get; set; }
        int Port { get; set; }
        string Username { get; set; }
        string Password { get; set; }
    }
}

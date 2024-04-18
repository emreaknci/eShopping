namespace NotificationService.API.Services
{
    public interface IMailService
    {
        Task SendMailAsync(string to, string subject, string body, bool isBodyHtml = true);
        Task SendMailAsync(string[] tos, string subject, string body, bool isBodyHtml = true);
        Task SendOrderCreatedMailAsync(string to, int orderId, bool isBodyHtml = true);
    }
}

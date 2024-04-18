using System.Net.Mail;
using System.Net;
using NotificationService.API.Settings;

namespace NotificationService.API.Services
{
    public class MailService : IMailService
    {
        private readonly IConfiguration _configuration;
        private readonly IEmailSettings _emailSettings;

        public MailService(IConfiguration configuration, IEmailSettings emailSettings)
        {
            _configuration = configuration;
            _emailSettings = emailSettings;
        }

        public async Task SendMailAsync(string to, string subject, string body, bool isBodyHtml = true)
        {
            await SendMailAsync(new[] { to }, subject, body, isBodyHtml);
        }

        public async Task SendMailAsync(string[] tos, string subject, string body, bool isBodyHtml = true)
        {
            MailMessage mail = new()
            {
                IsBodyHtml = isBodyHtml,
                Subject = subject,
                Body = body,
                From = new(_emailSettings.Username, "eShopping", System.Text.Encoding.UTF8)
            };
            foreach (var to in tos)
                mail.To.Add(to);

            SmtpClient smtp = new()
            {
                Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password),
                Port = _emailSettings.Port,
                EnableSsl = true,
                Host = _emailSettings.Host
            };
            await smtp.SendMailAsync(mail);
        }

        public async Task SendOrderCreatedMailAsync(string to,int orderId, bool isBodyHtml = true)
        {
            string mailBody = "";
            #region Mail Body
            mailBody = $"<html>\r\n\r\n<head>\r\n    <title></title>\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\r\n\r\n</head>\r\n\r\n<body style=\"background-color: #f0f0f0; margin: 0 !important; padding: 0 !important; height: 100%; \">\r\n\r\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\r\n        <!-- LOGO -->\r\n        <tr>\r\n            <td bgcolor=\"#cd0000\" align=\"center\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"480\">\r\n                    <tr>\r\n                        <td align=\"center\" valign=\"top\" style=\"padding: 40px 10px 40px 10px;\">\r\n                            <a href=\"http://litmus.com\" target=\"_blank\">\r\n                                <img alt=\"Logo\" src=\"https://cdn-icons-png.flaticon.com/512/7083/7083343.png\"\r\n                                    width=\"100\" height=\"100\"\r\n                                    style=\"display: block;  font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;\"\r\n                                    border=\"0\">\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n        <!-- HERO -->\r\n        <tr>\r\n            <td bgcolor=\"#cd0000\" align=\"center\" style=\"padding: 0px 10px 0px 10px;\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"480\">\r\n                    <tr>\r\n                        <td bgcolor=\"#ffffff\" align=\"center\" valign=\"top\"\r\n                            style=\"padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;\">\r\n                            <h1 style=\"font-size: 32px; font-weight: 400; margin: 0;\">Siparişiniz Alındı!</h1>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </td>\r\n        </tr>\r\n\r\n       \r\n        <!-- COPY BLOCK -->\r\n        <tr>\r\n            <td bgcolor=\"#f0f0f0\" align=\"center\" style=\"padding: 0px 10px 0px 10px;\">\r\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"480\">\r\n                    <!-- COPY -->\r\n                    <tr>\r\n                        <td bgcolor=\"#ffffff\" align=\"left\"\r\n                            style=\"padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;\">\r\n                            <p style=\"margin: 0;\">{orderId} numaralı siparişinizin ödemesi alınmıştır. En kısa sürede hazırlanmaya başlanacaktır. </p>\r\n                            <br>\r\n                            <p style=\"margin: 0;\">Bizi tercih ettiğiniz için teşekkür ederiz. </p>\r\n                        </td>\r\n                    </tr>                    \r\n                </table>\r\n            </td>\r\n        </tr>\r\n       \r\n    </table>\r\n\r\n</body>\r\n\r\n</html>";

            #endregion
            await SendMailAsync(to, "Siparişiniz Alındı!", mailBody, isBodyHtml);
        }
    }
}

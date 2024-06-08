using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using IdentityService.API.Models;

namespace IdentityService.API.Utils.Security.JWT
{
    public class TokenHandler : ITokenHandler
    {
        private readonly ITokenSettings _tokenSettings;

        public TokenHandler(ITokenSettings tokenSettings)
        {
            _tokenSettings = tokenSettings;
        }

        public AccessToken CreateAccessToken(User user)
        {
            JwtSecurityToken jwt = CreateJwtSecurityToken(_tokenSettings, user, TokenType.Access);

            AccessToken token = new()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(jwt),
                Expires = TimeSpan.FromMinutes(_tokenSettings.AccessExpiration).TotalSeconds
            };

            return token;
        }

        private Claim[] SetClaims(User user)
        {
            return new[]
            {
                new Claim(ClaimTypes.Name, user.FirstName +" " + user.LastName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };
        }

        private JwtSecurityToken CreateJwtSecurityToken(ITokenSettings tokenSettings, User user, TokenType tokenType)
        {
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(tokenSettings.SecurityKey));

            DateTime expires = tokenType switch
            {
                TokenType.Access => DateTime.UtcNow.Add(TimeSpan.FromMinutes(tokenSettings.AccessExpiration)),
                _ => DateTime.UtcNow.Add(TimeSpan.FromMinutes(tokenSettings.AccessExpiration))
            };
            DateTime now = DateTime.UtcNow;
            JwtSecurityToken jwt = new JwtSecurityToken(
                     issuer: tokenSettings.Issuer,
                     audience: tokenSettings.Audience,
                     claims: SetClaims(user),
                     notBefore: now,
                     expires: expires,
                     signingCredentials: new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256)
                 );
            return jwt;
        }

        private enum TokenType
        {
            Access,
            Refresh
        }
    }
}

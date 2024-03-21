using Billboard.Application.Abstracts.Services;
using Billboard.Application.Dtos.Authentication;
using Billboard.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Billboard.Persistence.Concretes.Managers
{
    public class AuthenticationManager : IAuthenticationService
    {
        public async Task<TokenDto> CreateToken(IConfiguration configuration, int id)
        {
            TokenDto token = new TokenDto();

            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:secretKey"]));

            SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = await GetClaims(id);
            claims.Add(new Claim("UserId", id.ToString()));

            token.Expiration = DateTime.Now.AddMinutes(Convert.ToInt16(configuration["JwtSettings:expires"]));

            JwtSecurityToken jwtSecurityToken = new(
                issuer: configuration["JwtSettings:validIssuer"],
                audience: configuration["JwtSettings:validAudience"],
                expires: token.Expiration,
                notBefore: DateTime.Now,
                signingCredentials: credentials,
                claims: claims
                );

            JwtSecurityTokenHandler jwtSecurityTokenHandler = new();
            token.AccessToken = jwtSecurityTokenHandler.WriteToken(jwtSecurityToken);
            return token;
        }

        private async Task<List<Claim>> GetClaims(int id)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, Convert.ToString(id))
            };

            return claims;
        }
    }
}

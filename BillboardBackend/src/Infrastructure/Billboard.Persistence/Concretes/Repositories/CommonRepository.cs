using Billboard.Application.Abstracts.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Billboard.Persistence.Concretes.Repositories
{
    public class CommonRepository : ICommonRepository
    {
        private IConfiguration _configuration;

        public CommonRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public int GetUserIdInAccessToken(string accessToken)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:secretKey"]));
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                // Token'ı çözümle
                var claimsPrincipal = tokenHandler.ValidateToken(accessToken, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                }, out SecurityToken validatedToken);

                // UserId değerini al
                var userIdClaim = claimsPrincipal.FindFirst("UserId");
                if (userIdClaim != null)
                    return Convert.ToInt32(userIdClaim.Value);
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

using Billboard.Application.Dtos.Authentication;
using Microsoft.Extensions.Configuration;

namespace Billboard.Application.Abstracts.Services
{
    public interface IAuthenticationService
    {
        public Task<TokenDto> CreateToken(IConfiguration configuration, int id);
    }
}


namespace Billboard.Application.Dtos.Authentication
{
    public class TokenDto
    {
        public String AccessToken { get; set; }
        public DateTime Expiration { get; set; }
    }
}

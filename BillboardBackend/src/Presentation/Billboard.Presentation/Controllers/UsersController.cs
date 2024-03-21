using Billboard.Application.Abstracts.Services;
using Billboard.Application.Dtos.Authentication;
using Billboard.Application.Dtos.User;
using Billboard.Application.Exceptions.NoPermission;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Billboard.Presentation.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IServiceManager _manager;

        public UsersController(
            IConfiguration configuration,
            IServiceManager manager)
        {
            _configuration = configuration;
            _manager = manager;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOneUserById(int id)
        {
            var userDto = await _manager.UserService.GetOneUserById(id);
            return Ok(userDto);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto userDto)
        {
            var userShowDto = await _manager.UserService.Register(userDto);

            TokenDto tokenDto = await _manager.Authentication.CreateToken(_configuration, userShowDto.Id);

            return Ok(new
            {
                userShowDto,
                tokenDto
            });
        }

        [Authorize]
        [HttpPost("update-password")]
        public async Task<IActionResult> UpdatePassword(UserPasswordUpdateDto userDto)
        {
            // Gelen isteğin HttpContext nesnesini al
            HttpContext httpContext = HttpContext;

            // Header bilgilerine erişim sağla
            if (httpContext.Request.Headers.TryGetValue("Authorization", out var Authorization))
            {
                await _manager.UserService.UpdatePassword(userDto, Authorization);
                return Ok("Password Updated");
            }

            throw new AccessTokenNoPermissionException();
            
        }

        [HttpPost("login-owner")]
        public async Task<IActionResult> LoginOwner(UserLoginDto userDto)
        {
            var userShowDto = await _manager.UserService.LoginOwner(userDto);

            TokenDto tokenDto = await _manager.Authentication.CreateToken(_configuration, userShowDto.Id);

            return Ok(new
            {
                userShowDto,
                tokenDto
            });
        }

        [HttpPost("login-advertising")]
        public async Task<IActionResult> LoginAdvertising(UserLoginDto userDto)
        {
            var userShowDto = await _manager.UserService.LoginAdvertising(userDto);

            TokenDto tokenDto = await _manager.Authentication.CreateToken(_configuration, userShowDto.Id);

            return Ok(new
            {
                userShowDto,
                tokenDto
            });
        }

        [Authorize]
        [HttpPost("update-photo")]
        public async Task<IActionResult> UpdatePhoto(UserPhotoUpdateDto userDto)
        {
            // Gelen isteğin HttpContext nesnesini al
            HttpContext httpContext = HttpContext;

            // Header bilgilerine erişim sağla
            if (httpContext.Request.Headers.TryGetValue("Authorization", out var Authorization))
            {
                var userShowDto = await _manager.UserService.UpdatePhoto(userDto, Authorization);

                TokenDto tokenDto = await _manager.Authentication.CreateToken(_configuration, userShowDto.Id);

                return Ok(new
                {
                    userShowDto,
                    tokenDto
                });
            }

            throw new AccessTokenNoPermissionException();

        }
    }
}

using Billboard.Application.Abstracts.Services;
using Billboard.Application.Dtos.AdvertisingRequest;
using Billboard.Application.Exceptions.NoPermission;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Billboard.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/advertisingRequests")]
    public class AdvertisingRequestsController : ControllerBase
    {
        private readonly IServiceManager _manager;

        public AdvertisingRequestsController(IServiceManager manager)
        {
            _manager = manager;
        }

        [HttpPost("create-ads")]
        public async Task<IActionResult> CreateOneAdsRequest(CreateAdsDto createAdsDto)
        {
            // Gelen isteğin HttpContext nesnesini al
            HttpContext httpContext = HttpContext;

            // Header bilgilerine erişim sağla
            if (httpContext.Request.Headers.TryGetValue("Authorization", out var Authorization))
            {
                var ads = await _manager.AdvertisingRequestService.CreateOneAdsRequest(createAdsDto, Authorization);
                return Ok(ads);
            }

            throw new AccessTokenNoPermissionException();
        }

        [HttpGet("advertising")]
        public async Task<IActionResult> GetAllAdvertisingRequestsForAdvertising()
        { 
            // Gelen isteğin HttpContext nesnesini al
            HttpContext httpContext = HttpContext;

            // Header bilgilerine erişim sağla
            if (httpContext.Request.Headers.TryGetValue("Authorization", out var Authorization))
            {
                var adsRequests = await _manager.AdvertisingRequestService.GetAllAdvertisingRequestsForAdvertising(Authorization);
                return Ok(adsRequests);
            }

            throw new AccessTokenNoPermissionException();
        }

        [HttpGet("owner")]
        public async Task<IActionResult> GetAllAdvertisingRequestsForOwner()
        {
            // Gelen isteğin HttpContext nesnesini al
            HttpContext httpContext = HttpContext;

            // Header bilgilerine erişim sağla
            if (httpContext.Request.Headers.TryGetValue("Authorization", out var Authorization))
            {
                var adsRequests = await _manager.AdvertisingRequestService.GetAllAdvertisingRequestsForOwner(Authorization);
                return Ok(adsRequests);
            }

            throw new AccessTokenNoPermissionException();
        }

        [HttpPut("update-approval-status")]
        public async Task<IActionResult> UpdateAprovalStatusById(UpdateAdvertisingRequestDto advertisingRequestDto)
        {
            var advertising = await _manager.AdvertisingRequestService.UpdateAprovalStatusById(advertisingRequestDto);
            return Ok(advertising);
        }
    }
}

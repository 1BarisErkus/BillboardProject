using Billboard.Application.Abstracts.Services;
using Billboard.Application.Dtos.Billboard.Owner;
using Billboard.Application.Exceptions.NoPermission;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Billboard.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/billboards")]
    public class BillboardsController : ControllerBase
    {
        private readonly IServiceManager _manager;

        public BillboardsController(IServiceManager manager)
        {
            _manager = manager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOneBillboard(BillboardCreateDto billboardDto)
        {
            // Gelen isteğin HttpContext nesnesini al
            HttpContext httpContext = HttpContext;

            // Header bilgilerine erişim sağla
            if (httpContext.Request.Headers.TryGetValue("Authorization", out var Authorization))
            {
                var billboardShowDto = await _manager.BillboardService.CreateOneBillboard(billboardDto, Authorization);
                return Ok(billboardShowDto);
            }

            throw new AccessTokenNoPermissionException();
        }

        [HttpGet("advertising")]
        public async Task<IActionResult> GetAllBillboardsForAdvertising()
        {
            // Gelen isteğin HttpContext nesnesini al
            HttpContext httpContext = HttpContext;

            // Header bilgilerine erişim sağla
            if (httpContext.Request.Headers.TryGetValue("Authorization", out var Authorization))
            {
                var billbordDtoList = await _manager.BillboardService.GetAllBillboardsForAdvertising(Authorization);
                return Ok(billbordDtoList);
            }

            throw new AccessTokenNoPermissionException();
        }

        [HttpGet("owner")]
        public async Task<IActionResult> GetAllBillboardsForOwner()
        {
            // Gelen isteğin HttpContext nesnesini al
            HttpContext httpContext = HttpContext;

            // Header bilgilerine erişim sağla
            if (httpContext.Request.Headers.TryGetValue("Authorization", out var Authorization))
            {
                var billbordDtoList = await _manager.BillboardService.GetAllBillboardsForOwner(Authorization);
                return Ok(billbordDtoList);
            }

            throw new AccessTokenNoPermissionException();
        }

        [HttpGet("create-ads")]
        public async Task<IActionResult> GetAllBillboardsForCreateAds()
        {
            var billbordDtoList = await _manager.BillboardService.GetAllBillboardsForCreateAds();
            return Ok(billbordDtoList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOneBillboardById(int id)
        {
            var billboard = await _manager.BillboardService.GetOneBillboardById(id);
            return Ok(billboard);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOneBillboard(BillboardUpdateDto billdoardDto)
        {
            // Gelen isteğin HttpContext nesnesini al
            HttpContext httpContext = HttpContext;

            // Header bilgilerine erişim sağla
            if (httpContext.Request.Headers.TryGetValue("Authorization", out var Authorization))
            {
                var billboardShowDto = await _manager.BillboardService.UpdateOneBillboard(billdoardDto, Authorization);
                return Ok(billboardShowDto);
            }

            throw new AccessTokenNoPermissionException();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOneBillboardById(int id)
        {
            var billboardShowDto = await _manager.BillboardService.DeleteOneBillboardById(id);
            return Ok(billboardShowDto);
        }

    }
}

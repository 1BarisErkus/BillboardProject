using AutoMapper;
using Billboard.Application.Abstracts.Services;
using Billboard.Application.Dtos.AdvertisingRequest;
using Billboard.Application.Dtos.Billboard.Advertising;
using Billboard.Application.Dtos.Billboard.Owner;
using Billboard.Application.Dtos.User;
using Billboard.Application.Exceptions.NotFound;
using Billboard.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Billboard.Persistence.Concretes.Managers
{
    public class AdvertisingRequestManager : IAdvertisingRequestService
    {
        private readonly IRepositoryService _manager;
        private readonly IMapper _mapper;

        public AdvertisingRequestManager(IRepositoryService manager,
            IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }

        public async Task<AdvertisingRequest> CreateOneAdsRequest(CreateAdsDto createAdsDto, string Authorization)
        {
            if(createAdsDto != null)
            {
                var advertisingRequest = _mapper.Map<AdvertisingRequest>(createAdsDto);

                var accessToken = Authorization.Split(" ");
                var userId = _manager.Common.GetUserIdInAccessToken(accessToken[1]);

                advertisingRequest.RequestedUserId = userId;
                advertisingRequest.RequestedDays = createAdsDto.RequestedDays;

                _manager.AdvertisingRequest.Create(advertisingRequest);
                await _manager.SaveAsync();

                return advertisingRequest;
            }
            return null;
        }

        public async Task<List<AdvertisingRequestShowDto>> GetAllAdvertisingRequestsForAdvertising(string Authorization) // Hatalı
        {
            var accessToken = Authorization.Split(" ");
            var userId = _manager.Common.GetUserIdInAccessToken(accessToken[1]);

            var advertisingRequests = await _manager.AdvertisingRequest.FindByCondition(a => a.RequestedUserId == userId).ToListAsync();

            List<AdvertisingRequestShowDto> advertisingRequestShowDtos = new();
            foreach (var advertisingRequest in advertisingRequests)
            {
                var billboard = await _manager.Billboard.FindByCondition(b => b.Id == advertisingRequest.BillboardId).SingleOrDefaultAsync() ?? throw new BillboardNotFoundException(0);

                advertisingRequestShowDtos.Add(new AdvertisingRequestShowDto
                {
                    Id = advertisingRequest.Id,
                    Billboard = _mapper.Map<BillboardShowDto>(billboard),
                    RequestedDays = advertisingRequest.RequestedDays,
                    IsApproval = advertisingRequest.IsApproval,
                });
            }
            return advertisingRequestShowDtos;
        }

        public async Task<List<AdvertisingRequestShowDto>> GetAllAdvertisingRequestsForOwner(string Authorization)
        {
            var accessToken = Authorization.Split(" ");
            var userId = _manager.Common.GetUserIdInAccessToken(accessToken[1]);

            var billboards = await _manager.Billboard.FindByCondition(b => b.CreatedUserId == userId).Where(b => b.AdvertisingId == 0).ToListAsync();

            if (billboards.Count == 0)
                throw new BillboardNotFoundException(0);

            var advertisingRequests = new List<AdvertisingRequest>();
            foreach (var billboard in billboards)
            {
                advertisingRequests.AddRange(await _manager.AdvertisingRequest.FindByCondition(a => a.BillboardId == billboard.Id).Where(a => a.IsApproval == 0).ToListAsync());
            }

            if (advertisingRequests.Count == 0)
                throw new AdvertisingRequestNotFoundException(0);

            var advertisingRequestsDto = new List<AdvertisingRequestShowDto>();
            foreach (var advertisingRequest in advertisingRequests)
            {
                var billboard = await _manager.Billboard.FindByCondition(b => b.Id == advertisingRequest.BillboardId).SingleOrDefaultAsync() ?? throw new BillboardNotFoundException(advertisingRequest.BillboardId);

                var billboardShowDto = _mapper.Map<BillboardShowDto>(billboard);

                var user = await _manager.User.FindByCondition(u => u.Id == advertisingRequest.RequestedUserId).SingleOrDefaultAsync() ?? throw new UserNotFoundException(billboard.AdvertisingId);

                billboardShowDto.AdvertisingUser = _mapper.Map<UserShowDto>(user);

                var userShowDto = _mapper.Map<UserShowDto>(user);


                advertisingRequestsDto.Add(new AdvertisingRequestShowDto
                {
                    Id = advertisingRequest.Id,
                    Billboard = billboardShowDto,
                    RequestedDays = advertisingRequest.RequestedDays,
                    IsApproval = advertisingRequest.IsApproval,
                });
            }

            return advertisingRequestsDto;
        }

        public async Task<AdvertisingRequest> UpdateAprovalStatusById(UpdateAdvertisingRequestDto advertisingRequestDto)
        {
            var advertisingRequest = await _manager.AdvertisingRequest.FindByCondition(a => a.Id == advertisingRequestDto.Id).SingleOrDefaultAsync() ?? throw new AdvertisingRequestNotFoundException(advertisingRequestDto.Id);
            advertisingRequest.IsApproval = advertisingRequestDto.IsApproval;

            if (advertisingRequest.IsApproval == 0)
            {
                _manager.AdvertisingRequest.Delete(advertisingRequest);
                await _manager.SaveAsync();

                return advertisingRequest;
            }

            _manager.AdvertisingRequest.Update(advertisingRequest);

            if (advertisingRequestDto.IsApproval == 1)
            {
                var billboard = await _manager.Billboard.FindByCondition(b => b.Id == advertisingRequest.BillboardId).SingleOrDefaultAsync() ?? throw new BillboardNotFoundException(advertisingRequest.BillboardId);

                billboard.AdvertisingId = advertisingRequest.RequestedUserId;
                billboard.ExpireDateTime = DateTime.UtcNow.AddDays(advertisingRequest.RequestedDays + 1);

                _manager.Billboard.Update(billboard);
            }


            await _manager.SaveAsync();

            return advertisingRequest;
        }
    }
}

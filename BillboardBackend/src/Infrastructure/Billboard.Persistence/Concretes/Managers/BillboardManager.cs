using AutoMapper;
using Billboard.Application.Abstracts.Services;
using Billboard.Application.Dtos.Billboard.Advertising;
using Billboard.Application.Dtos.Billboard.Owner;
using Billboard.Application.Dtos.User;
using Billboard.Application.Exceptions.NoPermission;
using Billboard.Application.Exceptions.NotFound;
using Billboard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Billboard.Persistence.Concretes.Managers
{
    public class BillboardManager : IBillboardService
    {
        private readonly IRepositoryService _manager;
        private readonly IMapper _mapper;

        public BillboardManager(IRepositoryService manager,
            IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }

        public async Task<BillboardShowDto> CreateOneBillboard(BillboardCreateDto billboardDto, string Authorization)
        {
            var checkExistBillboard = await _manager.Billboard.FindByCondition(b => b.Code == billboardDto.Code).AsNoTracking().SingleOrDefaultAsync();
            if (checkExistBillboard != null)
                throw new BillboardCodeAlreadyHaveException(billboardDto.Code);

            var accessToken = Authorization.Split(" ");
            var userId = _manager.Common.GetUserIdInAccessToken(accessToken[1]);

            var billboard = _mapper.Map<Domain.Entities.Billboard>(billboardDto);

            billboard.CreatedUserId = userId;
            billboard.UpdatedUserId = userId;
            billboard.CreatedDateTime = DateTime.Now;
            billboard.UpdatedDateTime = DateTime.Now;

            _manager.Billboard.Create(billboard);
            await _manager.SaveAsync();

            return _mapper.Map<BillboardShowDto>(billboard);
        }

        public async Task<BillboardShowDto> DeleteOneBillboardById(int id)
        {
            var billboard = await _manager.Billboard.FindByCondition(b => b.Id == id).AsNoTracking().SingleOrDefaultAsync();

            if(billboard == null)
                throw new BillboardNotFoundException(id);

            var advertisingRequests = await _manager.AdvertisingRequest.FindByCondition(a => a.BillboardId == id).ToListAsync();

            foreach (var advertisingRequest in advertisingRequests)
            {
                _manager.AdvertisingRequest.Delete(advertisingRequest);
            }

            _manager.Billboard.Delete(billboard);
            await _manager.SaveAsync();

            return _mapper.Map<BillboardShowDto>(billboard);
        }

        public async Task<List<BillboardShowDtoForAdvertising>> GetAllBillboardsForAdvertising(string Authorization)
        {
            var accessToken = Authorization.Split(" ");
            var userId = _manager.Common.GetUserIdInAccessToken(accessToken[1]);

            var billboards = await _manager.Billboard.FindByCondition(b => b.AdvertisingId == userId).ToListAsync();

            if (billboards.Count == 0)
                throw new BillboardNotFoundException(0);

            var billboardShowDtoList = new List<BillboardShowDtoForAdvertising>();
            foreach (var billboard in billboards)
            {
                var item = _mapper.Map<BillboardShowDtoForAdvertising>(billboard);
                var user = await _manager.User.FindByCondition(u => u.Id == billboard.CreatedUserId).SingleOrDefaultAsync();
                item.Owner = _mapper.Map<UserShowDto>(user);

                billboardShowDtoList.Add(item);
            }

            return billboardShowDtoList;
        }

        public async Task<List<BillboardShowDtoForAdvertising>> GetAllBillboardsForCreateAds()
        {
            var billboards = await _manager.Billboard.FindByCondition(b => b.AdvertisingId == 0).ToListAsync();

            if (billboards.Count == 0)
                throw new BillboardNotFoundException(0);

            var billboardShowDtoList = new List<BillboardShowDtoForAdvertising>();
            foreach (var billboard in billboards)
            {
                var item = _mapper.Map<BillboardShowDtoForAdvertising>(billboard);
                var user = await _manager.User.FindByCondition(u => u.Id == billboard.CreatedUserId).SingleOrDefaultAsync();
                item.Owner = _mapper.Map<UserShowDto>(user);

                billboardShowDtoList.Add(item);
            }

            return billboardShowDtoList;
        }

        public async Task<List<BillboardShowDto>> GetAllBillboardsForOwner(string Authorization)
        {
            var accessToken = Authorization.Split(" ");
            var userId = _manager.Common.GetUserIdInAccessToken(accessToken[1]);

            var billboards = await _manager.Billboard.FindByCondition(b => b.CreatedUserId == userId).ToListAsync();

            if (billboards.Count == 0)
                throw new BillboardNotFoundException(0);

            var billboardShowDtoList = new List<BillboardShowDto>();
            foreach (var billboard in billboards)
            {
                var item = _mapper.Map<BillboardShowDto>(billboard);
                var user = await _manager.User.FindByCondition(u => u.Id == billboard.AdvertisingId).SingleOrDefaultAsync();
                item.AdvertisingUser = _mapper.Map<UserShowDto>(user);

                billboardShowDtoList.Add(item);
            }

            return billboardShowDtoList;
        }

        public async Task<BillboardShowDto> GetOneBillboardById(int id)
        {
            var billboard = await _manager.Billboard.FindByCondition(b => b.Id == id).SingleOrDefaultAsync();

            return billboard == null ? throw new BillboardNotFoundException(id) : _mapper.Map<BillboardShowDto>(billboard);
        }

        public async Task<BillboardShowDto> UpdateOneBillboard(BillboardUpdateDto billboardDto, string Authorization)
        {
            var billboardCheckExist = await _manager.Billboard.FindByCondition(b => b.Id == billboardDto.Id).AsNoTracking().SingleOrDefaultAsync();

            if (billboardCheckExist == null)
                throw new BillboardNotFoundException(billboardDto.Id);

            var billboard = _mapper.Map<Domain.Entities.Billboard>(billboardDto);
            billboard.AdvertisingId = billboardCheckExist.AdvertisingId;
            billboard.CreatedUserId = billboardCheckExist.CreatedUserId;
            billboard.CreatedDateTime = billboardCheckExist.CreatedDateTime;

            var accessToken = Authorization.Split(" ");
            var userId = _manager.Common.GetUserIdInAccessToken(accessToken[1]);

            billboard.UpdatedUserId = userId;
            billboard.UpdatedDateTime = DateTime.Now;

            _manager.Billboard.Update(billboard);
            await _manager.SaveAsync();

            return _mapper.Map<BillboardShowDto>(billboard);
        }
    }
}

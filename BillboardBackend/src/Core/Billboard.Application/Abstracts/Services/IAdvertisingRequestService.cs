using Billboard.Application.Dtos.AdvertisingRequest;
using Billboard.Domain.Entities;

namespace Billboard.Application.Abstracts.Services
{
    public interface IAdvertisingRequestService
    {
        #region Common
        
        #endregion

        #region Owner
        Task<List<AdvertisingRequestShowDto>> GetAllAdvertisingRequestsForOwner(string Authorization);
        Task<AdvertisingRequest> UpdateAprovalStatusById(UpdateAdvertisingRequestDto advertisingRequestDto);
        #endregion

        #region Advertising
        Task<List<AdvertisingRequestShowDto>> GetAllAdvertisingRequestsForAdvertising(string Authorization);
        Task<AdvertisingRequest> CreateOneAdsRequest(CreateAdsDto createAdsDto, string Authorization);
        #endregion
    }
}

using Billboard.Application.Dtos.Billboard.Advertising;
using Billboard.Application.Dtos.Billboard.Owner;

namespace Billboard.Application.Abstracts.Services
{
    public interface IBillboardService
    {
        #region Common
        Task<BillboardShowDto> GetOneBillboardById(int id);
        Task<BillboardShowDto> DeleteOneBillboardById(int id);
        #endregion

        #region Owner
        Task<List<BillboardShowDto>> GetAllBillboardsForOwner(string Authorization);
        Task<BillboardShowDto> CreateOneBillboard(BillboardCreateDto billboardDto, string Authorization);
        Task<BillboardShowDto> UpdateOneBillboard(BillboardUpdateDto billboardDto, string Authorization);
        #endregion

        #region Advertising
        Task<List<BillboardShowDtoForAdvertising>> GetAllBillboardsForAdvertising(string Authorization);
        Task<List<BillboardShowDtoForAdvertising>> GetAllBillboardsForCreateAds();
        #endregion

    }
}

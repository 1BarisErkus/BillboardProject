using Billboard.Application.Abstracts.Repositories;

namespace Billboard.Application.Abstracts.Services
{
    public interface IRepositoryService
    {
        ICommonRepository Common { get; }
        IUserRepository User {  get; }
        IBillboardRepository Billboard { get; }
        IAdvertisingRequestRepository AdvertisingRequest { get; }
        Task SaveAsync();
    }
}

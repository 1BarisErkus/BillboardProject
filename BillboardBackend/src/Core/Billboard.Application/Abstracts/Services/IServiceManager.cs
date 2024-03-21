namespace Billboard.Application.Abstracts.Services
{
    public interface IServiceManager
    {
        IAuthenticationService Authentication { get; }
        IUserService UserService { get; }
        IBillboardService BillboardService { get; }
        IAdvertisingRequestService AdvertisingRequestService { get; }
    }
}

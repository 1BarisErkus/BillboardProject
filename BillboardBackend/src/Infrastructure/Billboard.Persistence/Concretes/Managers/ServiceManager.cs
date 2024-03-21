using Billboard.Application.Abstracts.Services;

namespace Billboard.Persistence.Concretes.Managers
{
    public class ServiceManager : IServiceManager
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUserService _userService;
        private readonly IBillboardService _billboardService;
        private readonly IAdvertisingRequestService _advertisingRequestService;

        public ServiceManager(
            IAuthenticationService authenticationService,
            IUserService userService,
            IBillboardService billboardService,
            IAdvertisingRequestService advertisingRequestService)
        {
            _authenticationService = authenticationService;
            _userService = userService;
            _billboardService = billboardService;
            _advertisingRequestService = advertisingRequestService;
        }

        public IUserService UserService => _userService;
        public IBillboardService BillboardService => _billboardService;
        public IAdvertisingRequestService AdvertisingRequestService => _advertisingRequestService;

        public IAuthenticationService Authentication => _authenticationService;
    }
}

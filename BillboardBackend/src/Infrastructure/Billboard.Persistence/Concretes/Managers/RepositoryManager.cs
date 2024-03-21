using Billboard.Application.Abstracts.Repositories;
using Billboard.Application.Abstracts.Services;
using Billboard.Persistence.Context;

namespace Billboard.Persistence.Concretes.Managers
{
    public class RepositoryManager : IRepositoryService
    {
        private readonly RepositoryContext _context;
        private readonly ICommonRepository _commonRepository;
        private readonly IUserRepository _userRepository;
        private readonly IBillboardRepository _billboardRepository;
        private readonly IAdvertisingRequestRepository _advertisingRequestRepository;

        public RepositoryManager(
            RepositoryContext context,
            ICommonRepository commonRepository,
            IUserRepository userRepository,
            IBillboardRepository billboardRepository,
            IAdvertisingRequestRepository advertisingRequestRepository)
        {
            _context = context;
            _commonRepository = commonRepository;
            _userRepository = userRepository;
            _billboardRepository = billboardRepository;
            _advertisingRequestRepository = advertisingRequestRepository;
        }

        public ICommonRepository Common => _commonRepository;
        public IUserRepository User => _userRepository;
        public IBillboardRepository Billboard => _billboardRepository;
        public IAdvertisingRequestRepository AdvertisingRequest => _advertisingRequestRepository;

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}

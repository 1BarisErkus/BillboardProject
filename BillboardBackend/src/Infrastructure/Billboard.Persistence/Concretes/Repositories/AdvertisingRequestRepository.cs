using Billboard.Application.Abstracts.Repositories;
using Billboard.Domain.Entities;
using Billboard.Persistence.Context;

namespace Billboard.Persistence.Concretes.Repositories
{
    public class AdvertisingRequestRepository : RepositoryBase<AdvertisingRequest>, IAdvertisingRequestRepository
    {
        public AdvertisingRequestRepository(RepositoryContext context) : base(context)
        {
        }
    }
}

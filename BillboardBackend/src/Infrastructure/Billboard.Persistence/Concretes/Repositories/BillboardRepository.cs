using Billboard.Application.Abstracts.Repositories;
using Billboard.Persistence.Context;

namespace Billboard.Persistence.Concretes.Repositories
{
    public class BillboardRepository : RepositoryBase<Domain.Entities.Billboard>, IBillboardRepository
    {
        public BillboardRepository(RepositoryContext context) : base(context)
        {
        }
    }
}

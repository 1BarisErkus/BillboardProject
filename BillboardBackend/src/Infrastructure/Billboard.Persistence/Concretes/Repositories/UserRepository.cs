using Billboard.Application.Abstracts.Repositories;
using Billboard.Domain.Entities;
using Billboard.Persistence.Context;

namespace Billboard.Persistence.Concretes.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepositoryContext context) : base(context)
        {
        }
    }
}

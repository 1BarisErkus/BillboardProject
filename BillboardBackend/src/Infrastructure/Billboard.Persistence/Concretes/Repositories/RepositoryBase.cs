using Billboard.Application.Abstracts.Repositories;
using Billboard.Persistence.Context;
using System.Linq.Expressions;

namespace Billboard.Persistence.Concretes.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected readonly RepositoryContext _context;

        public RepositoryBase(RepositoryContext context)
        {
            _context = context;
        }

        public void Create(T entity) => _context.Set<T>().Add(entity);

        public void Delete(T entity) => _context.Set<T>().Remove(entity);

        public IQueryable<T> FindAll() => _context.Set<T>();

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression) => _context.Set<T>().Where(expression);

        public void Update(T entity) => _context.Set<T>().Update(entity);
    }
}

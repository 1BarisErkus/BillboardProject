using Billboard.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Billboard.Persistence.Context
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Domain.Entities.Billboard> Billboards { get; set; }
        public DbSet<AdvertisingRequest> AdvertisingRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
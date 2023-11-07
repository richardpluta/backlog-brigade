using Microsoft.EntityFrameworkCore;
using ServicifyDB.Models;

namespace Servicify.Data
{
    public class ServicifyDataContext : DbContext
    {

        public DbSet<HelpWanted> helpWanteds { get; set; }
        public DbSet<Listing> listings { get; set; }
        public DbSet<Review> reviews { get; set; }
        public DbSet<User> users { get; set; }

        public ServicifyDataContext(DbContextOptions<ServicifyDataContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseInMemoryDatabase("MyDb"); // in memory for now

            //optionsBuilder.UseNpgsql(configuration.GetConnectionString("WebApiDatabase")); //connect with postgres with connection string from app; 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}

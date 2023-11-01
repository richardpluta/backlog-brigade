using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServicifyDB.Models;
using Microsoft.Extensions.Configuration;

namespace ServicifyDB.DBContents
{
    public class ServicifyDbContent : DbContext
    {
        protected readonly IConfiguration configuration;

        public DbSet<HelpWanted> helpWanteds { get; set; }
        public DbSet<Listing> listings { get; set; }
        public DbSet<Review> reviews { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<UserType> userTypes { get; set; }

        public ServicifyDbContent(IConfiguration configuration)
        {
            configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("MyDb"); // in memory for now

            //optionsBuilder.UseNpgsql(configuration.GetConnectionString("WebApiDatabase")); //connect with postgres with connection string from app; 
        }
    }
}

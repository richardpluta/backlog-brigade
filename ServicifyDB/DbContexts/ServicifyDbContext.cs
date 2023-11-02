using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServicifyDB.Models;
using Microsoft.Extensions.Configuration;

namespace ServicifyDB.DbContexts
{
    public class ServicifyDbContext : DbContext
    {

        public DbSet<HelpWanted> helpWanteds { get; set; }
        public DbSet<Listing> listings { get; set; }
        public DbSet<Review> reviews { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<UserType> userTypes { get; set; }

        public ServicifyDbContext(DbContextOptions<ServicifyDbContext> options) : base(options) { }
    }
}

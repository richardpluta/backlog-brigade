using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ServicifyDB.DbContexts;
using ServicifyDB.Models;
using ServicifyDB.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicifyDB
{
    public static class ConfigureDbServices
    {
        public static void AddDbServices(this IServiceCollection services, DbConnectionOptions config)
        {
            services.AddDbContext<ServicifyDbContext>(options => options.UseNpgsql(config.ConnectionString));

            //can swap between InMemoryRepo and Repo here. 
            services.AddTransient<IUserRepo, UserRepo>()
                    .AddTransient<IListingRepo, ListingRepo>();

        }
    }
}

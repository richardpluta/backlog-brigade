

using Microsoft.EntityFrameworkCore;
using Npgsql;
using Servicify.API.Services;
using Servicify.Data;
using ServicifyDB.Repository;
using System.Reflection;

namespace Servicify.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile($"appsettings.json", optional: false)
            .AddJsonFile($"appsettings.{EnvironmentName}.json", optional: false, reloadOnChange: true)
            .AddUserSecrets(Assembly.GetExecutingAssembly(), true)
            .AddEnvironmentVariables();

            // Add services to the container.
            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            NpgsqlConnectionStringBuilder dbBuilder = new(Environment.GetEnvironmentVariable("DATABASE_CONNECTION"));
            dbBuilder.Password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD");
            dbBuilder.Username = Environment.GetEnvironmentVariable("DATABASE_USERNAME");

            builder.Services.AddDbContext<ServicifyDataContext>(options => options.UseNpgsql(dbBuilder.ConnectionString));

            builder.Services.AddTransient<UserService>();
            builder.Services.AddTransient<HelpWantedService>();
            builder.Services.AddTransient<ReviewService>();
            builder.Services.AddTransient<ListingService>();
            builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();
            app.MapFallbackToFile("index.html");

            app.Run();

        }
        private static string EnvironmentName =>
          Environment
               .GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
               ?.ToLowerInvariant()
          ?? "Development";
    }
}
using Microsoft.EntityFrameworkCore;
using ServicifyDB.Models;
using ServicifyDB.Repository;
using System.Reflection;

namespace Servicify.API.Services
{
    public class HelpWantedService
    {
        private readonly IRepository<HelpWanted> helpWantedRepository;

        public HelpWantedService(IRepository<HelpWanted> helpWantedRepository)
        {
            this.helpWantedRepository = helpWantedRepository;
        }

        public HelpWanted Create(HelpWanted helpWanted)
        {
            return helpWantedRepository.Create(helpWanted);
        }

        public IEnumerable<HelpWanted> GetAll()
        {
            return helpWantedRepository.Get().Include(x => x.user).ToList();
        }

        public HelpWanted Update(int id, HelpWanted helpWanted)
        {
            HelpWanted dbHelpWanted = helpWantedRepository.Get().Where(x => x.id == id).First()
                ?? throw new BadHttpRequestException("Help wanted not found", 404);

            dbHelpWanted.postContent = helpWanted.postContent;
            dbHelpWanted.skillSet = helpWanted.skillSet;
            dbHelpWanted.expectedRate = helpWanted.expectedRate;
            dbHelpWanted.flagged = helpWanted.flagged;

            return helpWantedRepository.Update(dbHelpWanted);
        }

        public void Delete(int id)
        {
            HelpWanted helpWanted = helpWantedRepository.Get().Where(x => x.id == id).First();
            helpWantedRepository.Delete(helpWanted);
        }
    }
}

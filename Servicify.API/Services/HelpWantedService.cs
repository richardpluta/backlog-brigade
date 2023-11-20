using ServicifyDB.Models;
using ServicifyDB.Repository;

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
            return helpWantedRepository.Get().ToList();
        }

        public HelpWanted Update(int id)
        {
            HelpWanted helpWanted = helpWantedRepository.Get().Where(x => x.id == id).First();
            return helpWantedRepository.Update(helpWanted);
        }

        public void Delete(int id)
        {
            HelpWanted helpWanted = helpWantedRepository.Get().Where(x => x.id == id).First();
            helpWantedRepository.Delete(helpWanted);
        }
    }
}

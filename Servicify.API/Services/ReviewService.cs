using ServicifyDB.Models;
using ServicifyDB.Repository;

namespace Servicify.API.Services
{
    public class HelpWantedService
    {
        private readonly IRepository<HelpWanted> helpWantedRepository;

        public HelpWantedService(IRepository<HelpWanted> listingRepository)
        {
            this.helpWantedRepository = listingRepository;
        }

        public HelpWanted Create(HelpWanted helpWanted)
        {
            return helpWantedRepository.Create(helpWanted);
        }

        public IEnumerable<HelpWanted> GetAll()
        {
            return helpWantedRepository.Get().ToList();
        }

        public HelpWanted Update(HelpWanted helpWanted)
        {
            return helpWantedRepository.Update(helpWanted);
        }

        public void Delete(HelpWanted helpWanted)
        {
            helpWantedRepository.Delete(helpWanted);
        }
    }
}

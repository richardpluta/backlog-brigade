using ServicifyDB.Models;
using ServicifyDB.Repository;

namespace Servicify.API.Services
{
    public class ListingService
    {
        private readonly IRepository<Listing> listingRepository;

        public ListingService(IRepository<Listing> listingRepository)
        {
            this.listingRepository = listingRepository;
        }

        public Listing Create(Listing listing)
        {
            return listingRepository.Create(listing);
        }

        public IEnumerable<Listing> GetAll()
        {
            return listingRepository.Get().ToList();
        }

        public Listing Update(int id)
        {
            Listing listing = listingRepository.Get().Where(x => x.id == id).First();
            return listingRepository.Update(listing);
        }

        public void Delete(int id)
        {
            Listing listing = listingRepository.Get().Where(x => x.id == id).First();

            listingRepository.Delete(listing);
        }
    }
}

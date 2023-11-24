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

        public Listing Update(int id, Listing listing)
        {
            Listing dbListing = listingRepository.Get().Where(x => x.id == id).First()
                ?? throw new BadHttpRequestException("Listing not found", 404);

            dbListing.postContent = listing.postContent;
            dbListing.skillSet = listing.skillSet;
            dbListing.expectedRate = listing.expectedRate;

            return listingRepository.Update(dbListing);
        }

        public void Delete(int id)
        {
            Listing listing = listingRepository.Get().Where(x => x.id == id).First();

            listingRepository.Delete(listing);
        }
    }
}

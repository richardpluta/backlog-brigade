using Servicify.Data.Models;
using ServicifyDB.Models;
using ServicifyDB.Repository;

namespace Servicify.API.Services
{
    public class ListingService
    {
        private readonly IRepository<Listing> listingRepository;
        private readonly IRepository<User> userRepository;

        public ListingService(IRepository<Listing> listingRepository, IRepository<User> userRepository)
        {
            this.listingRepository = listingRepository;
            this.userRepository = userRepository;
        }

        public Listing Create(Listing listing)
        {
            return listingRepository.Create(listing);
        }

        public IEnumerable<UserListing> GetAll()
        {
            var listings = listingRepository.Get().ToList();
            var users = userRepository.Get().ToList();
            var userListingList = new List<UserListing>();
            foreach(var listing in listings)
            {
                var userListingItem = new UserListing();
                userListingItem.Listing = listing;
                userListingItem.User = users.Where(x => x.Id == listing.UserId).FirstOrDefault();
                userListingList.Add(userListingItem);
            }
            return userListingList;
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

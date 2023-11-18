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

        public Listing Update(Listing listing)
        {
            return listingRepository.Update(listing);
        }

        public void Delete(Listing listing)
        {
            listingRepository.Delete(listing);
        }
    }
}

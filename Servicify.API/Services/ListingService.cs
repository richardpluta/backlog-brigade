﻿using Microsoft.EntityFrameworkCore;
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
            Listing newListing = new()
            {
                UserId = listing.UserId,
                CreationDate = DateTime.UtcNow,
                PostContent = listing.PostContent,
                SkillSet = listing.SkillSet,
                ExpectedRate = listing.ExpectedRate
            };

            return listingRepository.Create(newListing);
        }

        public IEnumerable<Listing> GetAll()
        {
            return listingRepository.Get().Include(x => x.User).ToList();
        }

        public Listing Update(int id, Listing listing)
        {
            Listing dbListing = listingRepository.Get().Where(x => x.Id == id).Include(x => x.User).FirstOrDefault()
                ?? throw new BadHttpRequestException("Listing not found", 404);

            dbListing.PostContent = listing.PostContent;
            dbListing.SkillSet = listing.SkillSet;
            dbListing.ExpectedRate = listing.ExpectedRate;

            return listingRepository.Update(dbListing);
        }

        public void Delete(int id)
        {
            Listing listing = listingRepository.Get().Where(x => x.Id == id).FirstOrDefault()
                ?? throw new BadHttpRequestException("Listing not found", 404);

            listingRepository.Delete(listing);
        }
    }
}

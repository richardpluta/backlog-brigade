using ServicifyDB.Models;
using ServicifyDB.Repository;

namespace Servicify.API.Services
{
    public class ReviewService
    {
        private readonly IRepository<Review> reviewRepository;

        public ReviewService(IRepository<Review> reviewRepository)
        {
            this.reviewRepository = reviewRepository;
        }

        public Review Create(Review review)
        {
            return reviewRepository.Create(review);
        }

        public IEnumerable<Review> GetAll()
        {
            return reviewRepository.Get().ToList();
        }

        public Review Update(Review review)
        {
            return reviewRepository.Update(review);
        }

        public void Delete(Review review)
        {
            reviewRepository.Delete(review);
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            return reviewRepository.Get().Include(x => x.PostUser).Include(x => x.ReviewedUser);
        }

        public IEnumerable<Review> GetForUser(int userId)
        {
            return reviewRepository.Get().Where(x => x.ReviewedUserId == userId).Include(x => x.PostUser);
        }

        public Review Update(int id, Review review)
        {
            Review dbReview = reviewRepository.Get().FirstOrDefault(x => x.id == id)
                ?? throw new BadHttpRequestException("Review not found", 404);

            dbReview.PostContent = review.PostContent;
            dbReview.ReplyComment = review.ReplyComment;

            return reviewRepository.Update(dbReview);
        }

        public void Delete(int id)
        {
            Review review = reviewRepository.Get().FirstOrDefault(x => x.id == id)
                ?? throw new BadHttpRequestException("Review not found", 404);
            reviewRepository.Delete(review);
        }
    }
}
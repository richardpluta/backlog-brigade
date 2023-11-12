using Microsoft.AspNetCore.Mvc;
using ServicifyDB.Models;
using Servicify.API.Services;
namespace Servicify.API.Controllers
{
    [Route("api/review")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ReviewService reviewService;
        public ReviewController(ReviewService reviewService)
        {
            this.reviewService = reviewService;
        }
        [HttpPost]
        public ActionResult<Review> Create([FromBody] Review review)
        {
            return Ok(reviewService.Create(review));
        }
        [HttpGet]
        public ActionResult<List<Review>> GetAll()
        {
            return Ok(reviewService.GetAll());
        }
        [HttpPut]
        public ActionResult<Review> Update(Review review)
        {
            return Ok(reviewService.Update(review));
        }
        [HttpDelete]
        public ActionResult Delete(Review review)
        {
            reviewService.Delete(review);
            return Ok();
        }
    }
}
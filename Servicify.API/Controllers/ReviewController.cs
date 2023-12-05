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

        [HttpGet("user/{userId}")]
        public ActionResult<List<Review>> GetForUser(int userId)
        {
            return Ok(reviewService.GetForUser(userId));
        }

        [HttpPut("{id}")]
        public ActionResult<Review> Update(int id, [FromBody] Review review)
        {
            return Ok(reviewService.Update(id, review));
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            reviewService.Delete(id);
            return Ok();
        }
    }
}
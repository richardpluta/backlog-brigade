using Microsoft.AspNetCore.Mvc;
using ServicifyDB.Models;
using Servicify.API.Services;
using Servicify.Data.Models;

namespace Servicify.API.Controllers
{
    [Route("api/listing")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly ListingService listingService;

        public ListingController(ListingService listingService)
        {
            this.listingService = listingService;
        }

        [HttpPost]
        public ActionResult<Listing> Create([FromBody] Listing listing)
        {
            return Ok(listingService.Create(listing));
        }

        [HttpGet]
        public ActionResult<List<UserListing>> GetAll()
        {
            return Ok(listingService.GetAll());
        }

        [HttpPut]
        public ActionResult<Listing> Update(Listing listing)
        {
            return Ok(listingService.Update(listing));
        }

        [HttpDelete]
        public ActionResult Delete([FromBody] Listing listing)
        {
            listingService.Delete(listing);
            return  Ok("Deleted");
        }
    }
}

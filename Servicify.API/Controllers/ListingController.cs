﻿using Microsoft.AspNetCore.Mvc;
using ServicifyDB.Models;
using Servicify.API.Services;

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
        public ActionResult<List<Listing>> GetAll()
        {
            return Ok(listingService.GetAll());
        }

        [HttpPut("{id}")]
        public ActionResult<Listing> Update(int id, [FromBody] Listing listing)
        {
            return Ok(listingService.Update(id, listing));
        }

        
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            listingService.Delete(id);
            return  Ok();
        }
    }
}

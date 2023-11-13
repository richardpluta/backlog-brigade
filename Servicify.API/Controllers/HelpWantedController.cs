using Microsoft.AspNetCore.Mvc;
using ServicifyDB.Models;
using Servicify.API.Services;

namespace Servicify.API.Controllers
{
    [Route("api/helpwanted")]
    [ApiController]
    public class HelpWantedController : ControllerBase
    {
        private readonly HelpWantedService helpWantedService;

        public HelpWantedController(HelpWantedService helpWantedService)
        {
            this.helpWantedService = helpWantedService;
        }

        [HttpPost]
        public ActionResult<HelpWanted> Create([FromBody] HelpWanted helpWanted)
        {
            return Ok(helpWantedService.Create(helpWanted));
        }

        [HttpGet]
        public ActionResult<List<HelpWanted>> GetAll()
        {
            return Ok(helpWantedService.GetAll());
        }

        [HttpPut]
        public ActionResult<HelpWanted> Update(HelpWanted helpWanted)
        {
            return Ok(helpWantedService.Update(helpWanted));
        }

        [HttpDelete]
        public ActionResult Delete(HelpWanted helpWanted)
        {
            helpWantedService.Delete(helpWanted);
            return  Ok();
        }
    }
}

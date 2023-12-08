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
        public ActionResult<List<HelpWanted>> GetAll([FromQuery] Dictionary<string, string> filterParameters)
        {
            return Ok(helpWantedService.GetAll(filterParameters));
        }

        [HttpPut("{id}")]
        public ActionResult<HelpWanted> Update(int id, [FromBody] HelpWanted helpWanted)
        {
            return Ok(helpWantedService.Update(id, helpWanted));
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            helpWantedService.Delete(id);
            return Ok();
        }
    }
}

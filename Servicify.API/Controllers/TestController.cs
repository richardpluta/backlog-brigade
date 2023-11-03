using Microsoft.AspNetCore.Mvc;
using ServicifyDB.Models;
using ServicifyDB.Services;

namespace Servicify.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly TestService testService;

        public TestController(TestService testService)
        {
            this.testService = testService;
        }

        [HttpGet]
        [Route("testget")]
        public ActionResult<List<HelpWanted>> TestGetEndpoint()
        {
            return Ok(testService.TestMethod());
        }


    }

    public class TestObject
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public TestObject(int id, string name, string description)
        {
            Id = id;
            Name = name;
            Description = description;
        }
    }
}

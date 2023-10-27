using Microsoft.AspNetCore.Mvc;

namespace Servicify.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {

        [HttpGet]
        [Route("testget")]
        public async Task<IActionResult> TestGetEndpoint()
        {
            var testObject = new TestObject(1, "TestName", "This is a test object!");
            return Ok(testObject);
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

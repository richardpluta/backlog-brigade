using Microsoft.AspNetCore.Mvc;
using ServicifyDB.Models;
using Servicify.API.Services;

namespace Servicify.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public ActionResult<User> Create([FromBody] User user)
        {
            return Ok(userService.Create(user));
        }

        [HttpGet("{email}")]
        public ActionResult<User> Get(string email)
        {
            return Ok(userService.Get(email));
        }


        [HttpGet]
        public ActionResult<List<User>> GetAll()
        {
            return Ok(userService.GetAll());
        }

        [HttpPut]
        public ActionResult<User> Update( [FromBody] User user)
        {
            return Ok(this.userService.Update(user));
        }

        [HttpDelete]
        public ActionResult Delete(User user)
        {
            this.userService.Delete(user);
            return  Ok();
        }
    }
}

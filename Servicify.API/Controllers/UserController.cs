using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServicifyDB.Models;
using ServicifyDB.Services;

namespace Servicify.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _userRepo;

        public UserController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet("dummyuser")]
        public async Task<IActionResult> GetDummyUser()
        {
            var user = new User()
            {
                userID = 1,
                userType = UserType.Professional,
                userName = "dummyUserName",
                phone = "1234567890",
                email = "dummy@gmail.com",
                skillSet = "GruntWork",
                zip = "48220",
                userRate = 4
            };

            return Ok(user);
        }
    }
}

using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApi.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("account/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet("Admins")]
        [Authorize(Roles = "Admin")]
        public IActionResult AdminEndpoint()
        {
            var currentUser = GetCurrentUser();
            return Ok($"{currentUser.Username} ne!!, role: {currentUser.Role}");
        }

        [HttpGet("Public")]
        public IActionResult Public()
        {
            return Ok("you are not ok");
        }

        private Users GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            
            if (identity != null)
            {
                var userClaims = identity.Claims;
                return new Users
                {
                    Username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
                    Email = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                    Role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value,
                    FirstName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Surname)?.Value,
                    LastName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.GivenName)?.Value,
                    Address = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.StreetAddress)?.Value,
                    PhoneNumber = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.MobilePhone)?.Value,
                };
            }
            return null;
        }
    }
}

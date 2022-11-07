using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApi.Data;
using WebApi.Dto;
using WebApi.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("account/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly WebApiDbContext _context;
        public readonly IMapper _mapper;

        public UsersController(WebApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDtoGet>>> GetAllUsers()
        {
            return await _context.users.Select(user => _mapper.Map<UserDtoGet>(user)).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<UserDtoPost>> Register(UserDtoPost userDto)
        {
            Users user = _mapper.Map<Users>(userDto);
            _context.users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(userDto);
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

using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
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
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDtoGet>>> GetAllUsers()
        {
            //var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            return await _context.users.Select(user => _mapper.Map<UserDtoGet>(user)).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<UserDtoPost>> Register(UserDtoPost userDto)
        {
            var isExistUser = await _context.users.AnyAsync(u => u.Username == userDto.Username);
            if (isExistUser)
            {
                return BadRequest("User already exist");
            }

            byte[] initsalt = new byte[128 / 8];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(initsalt);
            }
            string initSaltStr = Encoding.ASCII.GetString(initsalt);
            byte[] salt = Encoding.ASCII.GetBytes(initSaltStr);
            string saltStr = Encoding.ASCII.GetString(salt);

            string hashPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: userDto.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 1000,
                numBytesRequested: 256 / 8));

            Users user = new Users
            {
                Username = userDto.Username,
                HashPassword = hashPassword,
                Email = userDto.Email,
                Address = userDto.Address,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                PhoneNumber = userDto.PhoneNumber,
                Role = "Customer",
                Salt = saltStr
            };
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

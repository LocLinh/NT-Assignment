using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebApi.Data;
using WebApi.Dto;
using WebApi.Interface;
using WebApi.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly WebApiDbContext _context;
        public readonly IMapper _mapper;
        private readonly ICommentRepository _commentRepository;

        public CommentsController(WebApiDbContext context, IMapper mapper, ICommentRepository commentRepository)
        {
            _context = context;
            _mapper = mapper;
            _commentRepository = commentRepository;
        }

        [Route("GetAllComments")]
        [HttpGet]
        public async Task<IEnumerable<Comments>> GetAllComments()
        {
            return await _context.comments.ToListAsync();
        }

        [HttpGet("GetAllCommentsByProduct/{productId}")]
        public async Task<IEnumerable<Comments>> GetAllCommentsByProduct(int productId)
        {
            return await _context.comments.Where(comment => comment.ProductId == productId)
                .Include(comment => comment.Users)
                .ToListAsync();
        }

        [HttpGet("GetReviewSummaryByProduct/{productId}")]
        public async Task<CommentRatingDto> GetReviewSummaryByProduct(int productId)
        {
            return await _commentRepository.ProductReviewSummary(productId);
        }

        [HttpGet("GetAllCommentsByUser/{username}")]
        public async Task<IEnumerable<Comments>> GetAllCommentsByUser(string username)
        {
            var user = await _context.users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                NotFound("Not found username");
            }

            return await _context.comments.Where(comment => comment.UserId == user.Id).ToListAsync();
        }

        //[Route("GetOneComment/{id}")]
        [HttpGet("{id}")]
        public async Task<Comments> GetOneComment(int id)
        {
            var comment = await _context.comments.FirstOrDefaultAsync(comment => comment.Id == id);
            if (comment == null)
            {
                NotFound("This comment does not exists");
            }

            return comment;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostComment(CommentDtoPost commentDto)
        {
            // get user name from header bearer token
            var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
            var tokenHandler = new JwtSecurityTokenHandler();
            var userInfo = tokenHandler.ReadJwtToken(token);
            var userName = userInfo.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;
            
            // find user and product in database
            var user = await _context.users.FirstOrDefaultAsync(u => u.Username == userName);
            var product = await _context.products.FirstOrDefaultAsync(p => p.Id == commentDto.ProductId);

            if (user != null && product != null)
            {
                Comments postComment = new Comments
                {
                    Content = commentDto.Content,
                    Rate = commentDto.Rate,
                    CreatedAt = DateTime.Now,
                    ModifiedAt = DateTime.Now,
                    UserId = user.Id,
                    ProductId = commentDto.ProductId,
                    Users = user,
                    Products = product
                };

                _context.comments.Add(postComment);
                await _context.SaveChangesAsync();

                return Ok(postComment);
            }

            return NotFound("Not found user or product");
        }
    }
}

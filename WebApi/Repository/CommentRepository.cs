using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dto;
using WebApi.Interface;

namespace WebApi.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly WebApiDbContext _context;
        public readonly IMapper _mapper;
        public CommentRepository(WebApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        } 

        public async Task<CommentRatingDto> ProductReviewSummary(int productId)
        {
            var reviews = await _context.comments.Where(c => c.ProductId == productId).ToListAsync();
            if (reviews.Any())
            {
                var ratingSummary = new CommentRatingDto
                {
                    ProductId = productId,
                    ReviewCount = reviews.Count,
                    AvgRating = reviews.Average(r => r.Rate)
                };
                return ratingSummary;
            }
            return new CommentRatingDto
            {
                ProductId = productId,
                ReviewCount = 0,
                AvgRating = 0,
            };

        }
    }
}

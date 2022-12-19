using WebApi.Dto;

namespace WebApi.Interface
{
    public interface ICommentRepository
    {
        public Task<CommentRatingDto> ProductReviewSummary(int productId);
    }
}

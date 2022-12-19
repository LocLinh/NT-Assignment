namespace WebApi.Dto
{
    public class CommentRatingDto
    {
        public int ProductId { get; set; }
        public double AvgRating { get; set; }
        public int ReviewCount { get; set; }
    }
}

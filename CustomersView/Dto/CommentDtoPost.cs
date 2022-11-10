using System.ComponentModel.DataAnnotations;

namespace CustomersView.Dto
{
    public class CommentDtoPost
    {
        public string Content { get; set; } = String.Empty;
        [Range(0, 5)]
        public int Rate { get; set; } = 5;
        public int ProductId { get; set; }
    }
}

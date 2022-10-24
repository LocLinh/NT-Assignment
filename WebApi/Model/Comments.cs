using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml;

namespace WebApi.Model
{
    public class Comments
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; } = String.Empty;
        public int Rate { get; set; }
        [Required]
        [ForeignKey("Products")]
        public Products ProductId { get; set; }
        [Required]
        [ForeignKey("Users")]
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public virtual Products Products { get; set; }
        public virtual Users Users { get; set; }
    }
}

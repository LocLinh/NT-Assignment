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
        [Range(0, 5)]
        public int Rate { get; set; } = 5;
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime ModifiedAt { get; set; } = DateTime.Now;
        public Products Products { get; set; }
        public Users Users { get; set; }
    }
}

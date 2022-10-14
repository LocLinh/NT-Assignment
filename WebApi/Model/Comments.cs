using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml;

namespace WebApi.Model
{
    public class Comments
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public int Rate { get; set; }
        public Products ProductId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}

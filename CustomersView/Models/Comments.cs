using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml;

namespace CustomersView.Models
{
    public class Comments
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; } = String.Empty;
        public int Rate { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime ModifiedAt { get; set; }
        public Products Products { get; set; }
        public Users Users { get; set; }
    }
}

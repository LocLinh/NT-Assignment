using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Model
{
    public class CartItems
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("Users")]
        public int UserId { get; set; }
        [Required]
        [ForeignKey("Products")]
        public int ProductId { get; set; }
        [Required]
        public int Quantity { get; set; } = 1;

        public virtual Users Users { get; set; }
        public virtual Products Products { get; set; }
    }
}

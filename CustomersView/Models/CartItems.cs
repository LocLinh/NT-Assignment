using System.ComponentModel.DataAnnotations;

namespace CustomersView.Models
{
    public class CartItems
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int Quantity { get; set; } = 1;
    }
}

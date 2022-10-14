using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Model
{
    public class Products
    {
        [Key]   
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; } = string.Empty;
        [Required]
        public int CategoryId { get; set; }
        [Column(TypeName = "money")]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter a value bigger than 0")]
        public int Price { get; set; }
        [Range(0, 100, ErrorMessage = "Please enter a value between 0 and 100")]
        public float DiscountPercent { get; set; } = 0;
    }
}

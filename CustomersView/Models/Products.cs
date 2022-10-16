using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CustomersView.Models
{
    public class Products
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public int Price { get; set; }
        public float DiscountPercent { get; set; } = 0;
    }
}

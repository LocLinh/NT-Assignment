using System.ComponentModel.DataAnnotations;

namespace WebApi.Model
{
    public class ProductCategories
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; } = string.Empty;
    }
}

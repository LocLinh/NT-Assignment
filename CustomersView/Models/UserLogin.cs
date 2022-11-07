using System.ComponentModel.DataAnnotations;

namespace CustomersView.Models
{
    public class UserLogin
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }

    }
}

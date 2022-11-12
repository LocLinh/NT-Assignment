using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Model
{
    [Index(nameof(Username), IsUnique=true)]
    public class Users
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50, ErrorMessage = "Username is too long.")]
        [RegularExpression(@"^[a-zA-Z][a-zA-Z0-9_]{5,49}$")]
        public string Username { get; set; }
        public string HashPassword { get; set; }
        public string Salt { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
    }
}

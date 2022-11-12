using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace WebApi.Dto
{
    public class UserDtoPost
    {
        [StringLength(50, ErrorMessage = "Username is too long.")]
        [RegularExpression(@"^[a-zA-Z][a-zA-Z0-9_]{5,49}$", ErrorMessage ="Username should have at least 6 characters, contain a to z and/or numbers and/or _")]
        public string Username { get; set; }
        [MinLength(8)]
        public string Password { get; set; }
        [Compare("Password", ErrorMessage = "Confirm password doesn't match, Type again.")]
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        [RegularExpression(@"^[0][1-9]{2}[0-9]{7}$", ErrorMessage = "You are not typing a phone number. If you don't have one, leave it empty.")]
        public string? PhoneNumber { get; set; } = "";
    }
}

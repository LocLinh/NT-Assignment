using System.ComponentModel.DataAnnotations;

namespace WebApi.Dto
{
    public class UserDtoPost
    {
        [StringLength(50, ErrorMessage = "Username is too long.")]
        [RegularExpression(@"^[a-zA-Z][a-zA-Z0-9_]{5,49}$")]
        public string Username { get; set; }
        [MinLength(8)]
        public string Password { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
    }
}

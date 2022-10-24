namespace WebApi.Model
{
    public class UserConstants
    {
        public static List<Users> Users = new List<Users>()
        {
            new Users()
            {
                Username = "loclinhadmin",
                Password = "Pass_w0rd",
                Email = "tomandjery4444@gmail.com",
                Role = "Admin",
                FirstName = "Nguyen",
                LastName = "Linh",
                Address = "32 Duong so 10, Linh Trung, Thu Duc, TpHCM",
                PhoneNumber = ""
            },
            new Users()
            {
                Username = "normies",
                Password = "Pass_w0rd",
                Email = "randomemail@gmail.com",
                Role = "Customer",
                FirstName = "Be",
                LastName = "Ta",
                Address = "33 Duong so 10, Linh Trung, Thu Duc, TpHCM",
                PhoneNumber = ""
            },
        };
    }
}

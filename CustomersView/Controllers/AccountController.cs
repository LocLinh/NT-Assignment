using CustomersView.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using NuGet.Common;
using NuGet.Frameworks;
using System.Security.Claims;
using System.Text;
using WebApi.Dto;

namespace CustomersView.Controllers
{
	public class AccountController : Controller
	{
		string baseUrl = "https://localhost:7151/account/";

        public IActionResult Login()
		{
			return View();
		}

		[HttpPost]
		public async Task<IActionResult> Login(UserLogin user)
		{
			if (user == null)
			{
				return View("Error");
			}

			var userData = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

			using (var client = new HttpClient())
			{
				client.BaseAddress = new Uri(baseUrl);
				
				var response = await client.PostAsync("Login", userData);
				if (response.IsSuccessStatusCode)
				{
					var token = await response.Content.ReadAsStringAsync();
					SetJWTCookie(token);
				}
			}

			return RedirectToAction("Index", "Home");
		}

        public IActionResult Logout()
        {
			Response.Cookies.Delete("JwtToken");
			return RedirectToAction("Index", "Home");
        }

		// Get 
		public IActionResult Register()
		{
			return View();
		}

		// Register user
		[HttpPost]
		public async Task<IActionResult> Register(UserDtoPost user)
		{
			if (user.PhoneNumber is null)
			{
				user.PhoneNumber = "";
			}
            var userData = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                var response = await client.PostAsync("Users", userData);
            }

            return View();
		}

        private void SetJWTCookie(string token)
		{
			var cookieOption = new CookieOptions()
			{
				HttpOnly = true,
				Expires = DateTime.UtcNow.AddMinutes(15),
				IsEssential = true
            };
			Response.Cookies.Append("JwtToken", token, cookieOption);
		}

	}
}

﻿using CustomersView.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NuGet.Common;
using System.Security.Claims;
using System.Text;

namespace CustomersView.Controllers
{
	public class AccountController : Controller
	{
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
				client.BaseAddress = new Uri("https://localhost:7151/account/");
				
				var response = await client.PostAsync("Login", userData);

				var token = await response.Content.ReadAsStringAsync();

				SetJWTCookie(token);

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

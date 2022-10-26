using Microsoft.AspNetCore.Mvc;

namespace CustomersView.Controllers
{
	public class AccountController : Controller
	{
		public IActionResult Login()
		{
			return View();
		}
	}
}

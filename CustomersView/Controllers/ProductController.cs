using Microsoft.AspNetCore.Mvc;
using CustomersView.Models;
namespace CustomersView.Controllers
{
    public class ProductController : Controller
    {
        // get all products
        public  IActionResult Index()
        {
            IEnumerable<Products> products = null;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7151/api/Products");

                var response = client.GetAsync("product");
                response.Wait();
                var result = response.Result;

                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadFromJsonAsync<Products>();
                    readTask.Wait();
                    products = (IEnumerable<Products>?)readTask.Result;
                }
                else
                {
                    products = null;
                    ModelState.AddModelError(string.Empty, "Server error");
                }
            }
            return View(products);
        }
    }
}

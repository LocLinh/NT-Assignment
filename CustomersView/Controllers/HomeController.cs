using CustomersView.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data.SqlTypes;
using System.Diagnostics;
using System.Net.Http.Headers;
using System.Text.Json.Serialization;

namespace CustomersView.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        string baseUrl = "https://localhost:7151/api/";

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        // Get all product
        public async Task<IActionResult> Index()
        {
            IEnumerable<Products> products = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("Application/Json"));

                HttpResponseMessage getData = await client.GetAsync("Products");
                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    products = JsonConvert.DeserializeObject<IEnumerable<Products>>(results);
                }
                else
                {
                    Console.WriteLine("error");
                }

            }
            return View(products);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
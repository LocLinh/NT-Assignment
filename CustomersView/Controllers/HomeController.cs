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
                string qParams = Request.Query["Category"];
                if (qParams != null)
                {
                    ViewBag.value = qParams;
                    products = products.Where(p => p.CategoryId.ToString() == qParams);
                }
            }
            return View(products);
        }

        // GET: HomeController1/Details/5
        public async Task<IActionResult> ProductDetail(int Id)
        {
            Products product = new Products();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("Application/Json"));

                HttpResponseMessage getData = await client.GetAsync($"Products/{Id}");

                if (getData.IsSuccessStatusCode)
                {
                    string result = getData.Content.ReadAsStringAsync().Result;
                    product = JsonConvert.DeserializeObject<Products>(result);

                }
            }
            return View(product);
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
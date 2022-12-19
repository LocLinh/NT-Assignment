using CustomersView.Dto;
using CustomersView.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NuGet.Common;
using System.Data.SqlTypes;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
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
            IEnumerable<ProductDtoGet> products = null;

            using (var client = new HttpClient())
            {
                //var token = Request.Cookies["JwtToken"];
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("Application/Json"));
                //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                HttpResponseMessage getData = await client.GetAsync("Products");

                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    products = JsonConvert.DeserializeObject<IEnumerable<ProductDtoGet>>(results);

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
            var token = Request.Cookies["JwtToken"];
            var userName = "";
            if (token != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var userInfo = tokenHandler.ReadJwtToken(token);
                userName = userInfo.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;
                ViewBag.userName = userName;
            }

            Products product = new Products();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("Application/Json"));

                HttpResponseMessage getProductData = await client.GetAsync($"Products/{Id}");
                if (getProductData.IsSuccessStatusCode)
                {
                    string resultForProduct = getProductData.Content.ReadAsStringAsync().Result;
                    product = JsonConvert.DeserializeObject<Products>(resultForProduct);
                    ViewData["product"] = product;
                }

                HttpResponseMessage getCommentData = await client.GetAsync($"Comments/GetAllCommentsByProduct/{Id}");
                if (getCommentData.IsSuccessStatusCode)
                {
                    string resultForComment = getCommentData.Content.ReadAsStringAsync().Result;
                    IEnumerable<Comments> comments = JsonConvert.DeserializeObject<IEnumerable<Comments>>(resultForComment);
                    ViewData["comments"] = comments;
                }

                HttpResponseMessage getRatingSummaryData = await client.GetAsync($"Comments/GetReviewSummaryByProduct/{Id}");
                if (getRatingSummaryData.IsSuccessStatusCode)
                {
                    string resultForRatingSummary = getRatingSummaryData.Content.ReadAsStringAsync().Result;
                    CommentRatingDto ratingSummary = JsonConvert.DeserializeObject<CommentRatingDto>(resultForRatingSummary);
                    ViewData["ratingSummary"] = ratingSummary;
                }

                return View();
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostComment(CommentDtoPost comment)
        {
            if (comment == null)
            {
                return View("Error");
            }
            var token = Request.Cookies["JwtToken"];

            var commentData = new StringContent(JsonConvert.SerializeObject(comment), Encoding.UTF8, "application/json");

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await client.PostAsync("Comments", commentData);
            }

            return RedirectToAction("ProductDetail", new { Id = comment.ProductId });
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
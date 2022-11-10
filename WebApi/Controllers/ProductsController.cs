using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dto;
using WebApi.Model;
using WebApi.Repository;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly WebApiDbContext _context;
        public readonly IMapper _mapper;
        public readonly IProductRepository _productRepository;
        public readonly ICategoryRepository _categoryRepository;

        public ProductsController(WebApiDbContext context, IMapper mapper, IProductRepository productRepository, ICategoryRepository categoryRepository)
        {
            _context = context;
            _mapper = mapper;
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDtoGet>>> GetProductsModel()
        {
            IEnumerable<Products> products = await _productRepository.GetProducts();
            return Ok(_mapper.Map<IEnumerable<ProductDtoGet>>(products));
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProductsModel(int id)
        {
            var product = await _productRepository.GetOneProducts(id);
            if (product == null)
            {
                return NoContent();
            }
            return Ok(product);
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductsModel(int id, ProductDtoPost productsDto)
          {
            var category = await _categoryRepository.GetOneCategory(productsDto.CategoryId);
            if (category == null)
            {
                return BadRequest();
            }

            var newProduct = new Products
            {
                Id = id,
                Name = productsDto.Name,
                Description = productsDto.Description,
                CategoryId = productsDto.CategoryId,
                Price = productsDto.Price,
                DiscountPercent = productsDto.DiscountPercent,
                ImagePath = productsDto.ImagePath,
                Categories = category
            };

            _productRepository.PutProducts(newProduct);

            try
            {
                await _productRepository.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsModelExists(id))
                {
                    return BadRequest();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductDtoPost>> PostProductsModel(ProductDtoPost productsModel)
        {
            var productcategory = await _categoryRepository.GetOneCategory(productsModel.CategoryId);
            if (productcategory == null)
            {
                return BadRequest("Cửa hàng chúng tôi hiện không nhận loại sản phẩm bạn vừa thêm.");
            }
            Products product = new Products
            {
                Name = productsModel.Name,
                Description = productsModel.Description,
                CategoryId = productsModel.CategoryId,
                Price = productsModel.Price,
                DiscountPercent = productsModel.DiscountPercent,
                ImagePath = productsModel.ImagePath,
                Categories = productcategory,
            };

            await _productRepository.AddOneProducts(product);
            await _productRepository.Save();

            return CreatedAtAction("GetProductsModel", new { id = product.Id }, product);

        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductsModel(int id)
        {
            Products product = await _productRepository.GetOneProducts(id);
            if (product == null)
            {
                return NoContent();
            }
            _productRepository.DeleteProducts(product);
            await _productRepository.Save();

            return Ok("Delete successfully.");
        }

        private bool ProductsModelExists(int id)
        {
            return _context.products.Any(e => e.Id == id);
        }
    }
}

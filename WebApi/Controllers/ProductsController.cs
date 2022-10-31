using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dto;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly WebApiDbContext _context;
        public readonly IMapper _mapper;

        public ProductsController(WebApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> GetProductsModel()
        {
            //var productList = await _context.products.Include(product => product.Categories).ToListAsync();
            //var productsPublic = productList.Select(product => _mapper.Map<ProductDtoGet>(product));
            return await _context.products.Include(product => product.Categories).ToListAsync();
            //return Ok(productsPublic);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProductsModel(int id)
        {
            var productsModel = await _context.products.Include(product => product.Categories).FirstOrDefaultAsync(product => product.Id == id);
            if (productsModel == null)
            {
                return NotFound();
            }

            return productsModel;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductsModel(int id,Products productsModel)
        {
            if (id != productsModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(productsModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductDtoPost>> PostProductsModel(ProductDtoPost productsModel)
        {
            var productcategory = _context.productCategories.FirstOrDefault(category => category.Id == productsModel.CategoryId);
            if (productcategory == null)
            {
                return NotFound("Cửa hàng chúng tôi hiện không nhận loại sản phẩm bạn vừa thêm.");
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
            _context.products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductsModel", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductsModel(int id)
        {
            var productsModel = await _context.products.FindAsync(id);
            if (productsModel == null)
            {
                return NotFound();
            }

            _context.products.Remove(productsModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductsModelExists(int id)
        {
            return _context.products.Any(e => e.Id == id);
        }
    }
}

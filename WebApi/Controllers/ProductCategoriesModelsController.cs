using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoriesModelsController : ControllerBase
    {
        private readonly ProductCategoryDbContext _context;

        public ProductCategoriesModelsController(ProductCategoryDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductCategoriesModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategories>>> GetProductCategoriesModel()
        {
            return await _context.ProductCategoriesModel.ToListAsync();
        }

        // GET: api/ProductCategoriesModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategories>> GetProductCategoriesModel(int id)
        {
            var productCategoriesModel = await _context.ProductCategoriesModel.FindAsync(id);

            if (productCategoriesModel == null)
            {
                return NotFound();
            }

            return productCategoriesModel;
        }

        // PUT: api/ProductCategoriesModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductCategoriesModel(int id, ProductCategories productCategoriesModel)
        {
            if (id != productCategoriesModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(productCategoriesModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductCategoriesModelExists(id))
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

        // POST: api/ProductCategoriesModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductCategories>> PostProductCategoriesModel(ProductCategories productCategoriesModel)
        {
            Console.WriteLine(productCategoriesModel);
            _context.ProductCategoriesModel.Add(productCategoriesModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductCategoriesModel", new { id = productCategoriesModel.Id }, productCategoriesModel);
        }

        // DELETE: api/ProductCategoriesModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductCategoriesModel(int id)
        {
            var productCategoriesModel = await _context.ProductCategoriesModel.FindAsync(id);
            if (productCategoriesModel == null)
            {
                return NotFound();
            }

            _context.ProductCategoriesModel.Remove(productCategoriesModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductCategoriesModelExists(int id)
        {
            return _context.ProductCategoriesModel.Any(e => e.Id == id);
        }
    }
}

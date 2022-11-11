using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Model;
using WebApi.Repository;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoriesModelsController : ControllerBase
    {
        private readonly WebApiDbContext _context;
        private readonly ICategoryRepository _categoryRepository;

        public ProductCategoriesModelsController(WebApiDbContext context, ICategoryRepository categoryRepository)
        {
            _context = context;
            _categoryRepository = categoryRepository;
        }

        // GET: api/ProductCategoriesModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategories>>> GetProductCategoriesModel()
        {
            return Ok(await _categoryRepository.GetAllCategories());
        }

        // GET: api/ProductCategoriesModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategories>> GetProductCategoriesModel(int id)
        {
            var productCategoriesModel = await _categoryRepository.GetOneCategory(id);

            if (productCategoriesModel == null)
            {
                return NoContent();
            }

            return Ok(productCategoriesModel);
        }

        // PUT: api/ProductCategoriesModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductCategoriesModel(int id, ProductCategories productCategoriesModel)
        {
            if (id != productCategoriesModel.Id)
            {
                return BadRequest();
            }

            _categoryRepository.UpdateCategory(productCategoriesModel);

            try
            {
                await _categoryRepository.Save();
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
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<ProductCategories>> PostProductCategoriesModel(ProductCategories productCategoriesModel)
        {
            await _categoryRepository.AddOneCategory(productCategoriesModel);
            await _categoryRepository.Save();

            return CreatedAtAction("GetProductCategoriesModel", new { id = productCategoriesModel.Id }, productCategoriesModel);
        }

        // DELETE: api/ProductCategoriesModels/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductCategoriesModel(int id)
        {
            var productCategories = await _categoryRepository.GetOneCategory(id);
            if (productCategories == null)
            {
                return NotFound();
            }
            _categoryRepository.DeleteCategory(productCategories);
            await _categoryRepository.Save();

            return NoContent();
        }

        private bool ProductCategoriesModelExists(int id)
        {
            return _context.productCategories.Any(e => e.Id == id);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductDbContext _context;
        public readonly IMapper _mapper;

        public ProductsController(ProductDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> GetProductsModel()
        {
            return await _context.ProductsModel.Select(product => _mapper.Map<Products>(product)).ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProductsModel(int id)
        {
            var productsModel = await _context.ProductsModel.FindAsync(id);

            if (productsModel == null)
            {
                return NotFound();
            }

            return productsModel;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        
        public async Task<IActionResult> PutProductsModel(int id,[FromForm] Products productsModel)
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
        public async Task<ActionResult<Products>> PostProductsModel([FromForm] Products productsModel)
        {
            _context.ProductsModel.Add(productsModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductsModel", new { id = productsModel.Id }, productsModel);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductsModel(int id)
        {
            var productsModel = await _context.ProductsModel.FindAsync(id);
            if (productsModel == null)
            {
                return NotFound();
            }

            _context.ProductsModel.Remove(productsModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductsModelExists(int id)
        {
            return _context.ProductsModel.Any(e => e.Id == id);
        }
    }
}

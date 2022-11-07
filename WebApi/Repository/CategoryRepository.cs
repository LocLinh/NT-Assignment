using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Model;

namespace WebApi.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly WebApiDbContext _context;
        public readonly IMapper _mapper;

        public CategoryRepository(WebApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddOneCategory(ProductCategories category)
        {
            await _context.productCategories.AddAsync(category);
        }

        public void DeleteCategory(ProductCategories category)
        {
            _context.productCategories.Remove(category);
        }

        public async Task<IEnumerable<ProductCategories>> GetAllCategories()
        {
            return await _context.productCategories.ToListAsync();
        }

        public async Task<ProductCategories> GetOneCategory(int id)
        {
            return await _context.productCategories.FindAsync(id);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public void UpdateCategory(ProductCategories category)
        {
            _context.Entry(category).State = EntityState.Modified;
        }
    }
}

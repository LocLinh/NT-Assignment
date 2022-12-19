using AutoMapper;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Model;
using WebApi.Interface;

namespace WebApi.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly WebApiDbContext _context;
        public readonly IMapper _mapper;

        public ProductRepository( WebApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddOneProducts(Products product)
        {
            await _context.products.AddAsync(product);
        }

        public void DeleteProducts(Products product)
        {
            _context.products.Remove(product);
        }

        public async Task<Products> GetOneProducts(int id)
        {
            return await _context.products.Include(p => p.Categories).FirstOrDefaultAsync(product => product.Id == id);
        }

        public async Task<IEnumerable<Products>> GetProducts()
        {
            return await _context.products.Include(product => product.Categories).ToListAsync();
        }

        public void PutProducts(Products product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }
        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

    }
}

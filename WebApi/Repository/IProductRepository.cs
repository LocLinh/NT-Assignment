using Microsoft.AspNetCore.Mvc;
using WebApi.Dto;
using WebApi.Model;

namespace WebApi.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Products>> GetProducts();
        Task<Products> GetOneProducts(int id);
        void PutProducts(Products product);
        Task AddOneProducts(Products product);
        void DeleteProducts(Products products);
        Task Save();
    }
}

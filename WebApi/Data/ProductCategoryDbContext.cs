using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Model;

    public class ProductCategoryDbContext : DbContext
    {
        public ProductCategoryDbContext (DbContextOptions<ProductCategoryDbContext> options)
            : base(options)
        {
        }

        public DbSet<WebApi.Model.ProductCategories> ProductCategoriesModel { get; set; } = default!;
    }

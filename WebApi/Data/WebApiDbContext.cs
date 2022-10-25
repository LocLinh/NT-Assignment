using Microsoft.EntityFrameworkCore;
using WebApi.Model;

namespace WebApi.Data
{
    public class WebApiDbContext : DbContext
    {
        public WebApiDbContext(DbContextOptions<WebApiDbContext> options) : base(options)
        {

        }

        public DbSet<Users> users { get; set; } = default!;
        public DbSet<ProductCategories> productCategories { get; set; } = default!;
        public DbSet<Products> products { get; set; } = default!;
        public DbSet<Comments> comments { get; set; } = default!;
        public DbSet<CartItems> cartItems { get; set; } = default!;
    }
}

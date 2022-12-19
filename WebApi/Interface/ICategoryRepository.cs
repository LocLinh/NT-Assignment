using WebApi.Model;

namespace WebApi.Interface
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<ProductCategories>> GetAllCategories();
        Task<ProductCategories> GetOneCategory(int id);
        void UpdateCategory(ProductCategories category);
        Task AddOneCategory(ProductCategories category);
        void DeleteCategory(ProductCategories category);
        Task Save();
    }
}

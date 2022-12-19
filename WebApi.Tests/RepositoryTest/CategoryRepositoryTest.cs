using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Data;
using WebApi.Mapper;
using WebApi.Model;
using WebApi.Repository;

namespace WebApi.Tests.RepositoryTest
{
    public class CategoryRepositoryTest
    {
        private readonly WebApiDbContext _context;
        private readonly IMapper _mapper;
        private readonly List<ProductCategories> _categories;

        public CategoryRepositoryTest()
        {
            var _options = new DbContextOptionsBuilder<WebApiDbContext>().UseInMemoryDatabase("CategoryTestDb").Options;
            _context = new WebApiDbContext(_options);
            _mapper = new MapperConfiguration(clf => clf.AddProfile(new AutoMapperConfiguration())).CreateMapper();
            _categories = new()
            {
                new ProductCategories() {Id = 1, Name = "A" , Desc = "CharacterA"}, 
                new ProductCategories() {Id = 2, Name = "B" , Desc = "CharacterB"} 
            };
            _context.Database.EnsureDeleted();
            _context.productCategories.AddRange(_categories);
            _context.SaveChanges();
        }

        [Fact]
        public void GetAllCategories_SuccessAsync_ShouldReturnAllCategory()
        {
            //Arrange
            var expectedCategoryList = _context.productCategories.ToList();
            CategoryRepository categoryRepository = new CategoryRepository(_context, _mapper);

            // Act
            var result = categoryRepository.GetAllCategories().Result;

            // Assert
            Assert.Equal(expectedCategoryList, result);
        }

        [Fact]
        public void GetOneCategory_WithRightId_ShouldReturnOneCategory()
        {
            //Arrange
            var categoryId = 1;
            var expectedCategory = _context.productCategories.Find(categoryId);
            CategoryRepository categoryRepository = new CategoryRepository(_context, _mapper);

            // Act
            var result = categoryRepository.GetOneCategory(categoryId).Result;

            // Assert
            Assert.Equal(expectedCategory, result);
        }

        [Fact]
        public void GetOneCategory_WithNotExistId_ShouldReturnOneCategory()
        {
            //Arrange
            var categoryId = 5;
            CategoryRepository categoryRepository = new CategoryRepository(_context, _mapper);

            // Act
            var result = categoryRepository.GetOneCategory(categoryId).Result;

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public void AddOneCategory_SuccessAsync_ShouldAddOneCategory()
        {
            //Arrange
            var newCategory = new ProductCategories
            {
                Name = "C",
                Desc = "CharacterC"
            };

            CategoryRepository categoryRepository = new CategoryRepository(_context, _mapper);

            // Act
            var result = categoryRepository.AddOneCategory(newCategory);
            _ = categoryRepository.Save();

            // Assert
            Assert.NotNull(_context.productCategories.FirstOrDefault(cate => cate.Name == newCategory.Name));
        }
    }
}

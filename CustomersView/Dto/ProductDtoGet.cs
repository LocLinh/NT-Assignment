namespace CustomersView.Dto
{
    public class ProductDtoGet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int Price { get; set; }
        public float DiscountPercent { get; set; }
        public string ImagePath { get; set; }
    }
}

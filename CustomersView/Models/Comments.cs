namespace CustomersView.Models
{
    public class Comments
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int Rate { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}

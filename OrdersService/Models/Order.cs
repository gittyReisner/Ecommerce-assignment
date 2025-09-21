namespace OrdersService.Models;

public enum OrderStatus
{
    Draft,
    Confirmed,
    Cancelled
}

public class OrderItem
{
    public Guid ProductId { get; set; }
    public string Sku { get; set; } = "";
    public int Qty { get; set; }
    public decimal UnitPrice { get; set; }
}

public class Order
{
    public Guid Id { get; set; }
    public string CustomerId { get; set; } = "";
    public OrderStatus Status { get; set; } = OrderStatus.Draft;
    public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    public decimal TotalAmount => ComputeTotal();

    private decimal ComputeTotal()
    {
        decimal total = 0;
        foreach (var item in Items)
        {
            total += item.UnitPrice * item.Qty;
        }
        return total;
    }
}

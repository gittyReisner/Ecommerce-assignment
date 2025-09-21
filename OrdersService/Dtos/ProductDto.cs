namespace OrdersService.Dtos;

public class ProductDto
{
    public Guid Id { get; set; }
    public string Sku { get; set; } = string.Empty;
    public decimal Price { get; set; }
}

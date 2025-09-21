using System.Text.Json;
using OrdersService.Models;

namespace OrdersService.Repositories;

public class OrderRepository
{
    private readonly string _file = Path.Combine("Data", "orders.json");
    private List<Order> _orders;

    public OrderRepository()
    {
        if (File.Exists(_file))
            _orders = JsonSerializer.Deserialize<List<Order>>(File.ReadAllText(_file)) ?? new List<Order>();
        else
            _orders = new List<Order>();
    }

    private void Save() => File.WriteAllText(_file, JsonSerializer.Serialize(_orders));

    public Order Create(Order order)
    {
        order.Id = Guid.NewGuid();
        _orders.Add(order);
        Save();
        return order;
    }

    public Order? Get(Guid id) => _orders.FirstOrDefault(o => o.Id == id);

    public void Update(Order order)
    {
        var index = _orders.FindIndex(o => o.Id == order.Id);
        if (index >= 0)
            _orders[index] = order;
        Save();
    }

    public IEnumerable<Order> GetAll() => _orders;
}

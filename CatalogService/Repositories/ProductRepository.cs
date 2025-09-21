using System.Text.Json;
using CatalogService.Models;

namespace CatalogService.Repositories;

public class ProductRepository
{
    private readonly string _file;
    private List<Product> _products;

    public ProductRepository()
    {
        _file = Path.Combine(Directory.GetCurrentDirectory(), "products.json");

        if (!File.Exists(_file))
            File.WriteAllText(_file, "[]");

        _products = JsonSerializer.Deserialize<List<Product>>(
            File.ReadAllText(_file),
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        ) ?? new();

        Console.WriteLine($"[ProductRepository] Loaded {_products.Count} products from {_file}:");
        foreach (var p in _products)
            Console.WriteLine($"- {p.Sku} {p.Name} ${p.Price} ({p.Stock} in stock)");
    }

    private void Save() =>
        File.WriteAllText(_file,
            JsonSerializer.Serialize(_products,
                new JsonSerializerOptions { WriteIndented = true }));

    public Product Create(Product product)
    {
        product.Id = Guid.NewGuid();
        _products.Add(product);
        Save();
        return product;
    }

    public Product? Get(Guid id) => _products.FirstOrDefault(p => p.Id == id);

    public IEnumerable<Product> GetAll(string? search = null)
    {
        var query = _products.AsEnumerable();
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(p =>
                p.Name.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                p.Sku.Contains(search, StringComparison.OrdinalIgnoreCase));
        }
        return query;
    }

    public void Update(Product product)
    {
        var index = _products.FindIndex(p => p.Id == product.Id);
        if (index >= 0)
        {
            _products[index] = product;
            Save();
        }
    }
}

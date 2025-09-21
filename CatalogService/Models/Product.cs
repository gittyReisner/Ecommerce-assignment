using System;

namespace CatalogService.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Sku { get; set; } = "";
        public string Name { get; set; } = "";
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}

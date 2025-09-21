using Microsoft.AspNetCore.Mvc;
using CatalogService.Models;
using CatalogService.Repositories;

namespace CatalogService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductRepository _repo;

    public ProductsController(ProductRepository repo)
    {
        _repo = repo;
    }

    [HttpPost]
    public ActionResult<Product> Create([FromBody] Product product)
    {
        var created = _repo.Create(product);
        return Ok(created);
    }

    [HttpGet]
    public ActionResult<IEnumerable<Product>> Get([FromQuery] string? search = null)
    {
        return Ok(_repo.GetAll(search));
    }

    [HttpGet("{id}")]
    public ActionResult<Product> Get(Guid id)
    {
        var product = _repo.Get(id);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPatch("{id}")]
    public ActionResult<Product> Update(Guid id, [FromBody] Product patch)
    {
        var product = _repo.Get(id);
        if (product is null) return NotFound();

        product.Name = patch.Name ?? product.Name;
        product.Price = patch.Price != 0 ? patch.Price : product.Price;
        product.Stock = patch.Stock != 0 ? patch.Stock : product.Stock;

        _repo.Update(product);
        return Ok(product);
    }
}

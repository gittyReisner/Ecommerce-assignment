using Microsoft.AspNetCore.Mvc;
using OrdersService.Models;
using OrdersService.Repositories;
using OrdersService.Dtos;
using OrdersService.Services;

namespace OrdersService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly OrderRepository _repo;
    private readonly CatalogClient _catalog;

    public OrdersController(OrderRepository repo, CatalogClient catalog)
    {
        _repo = repo;
        _catalog = catalog;
    }

    [HttpPost]
    public ActionResult<Order> Create([FromBody] CreateOrderDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.CustomerId))
            return BadRequest("CustomerId is required");

        var order = new Order { CustomerId = dto.CustomerId };
        _repo.Create(order);
        return Ok(order);
    }

    [HttpGet("{id}")]
    public ActionResult<Order> Get(Guid id)
    {
        var order = _repo.Get(id);
        return order is null ? NotFound() : Ok(order);
    }

    [HttpPost("{id}/items")]
    public async Task<ActionResult<Order>> AddItem(Guid id, [FromBody] AddOrderItemDto dto)
    {
        var order = _repo.Get(id);
        if (order is null) return NotFound();
        if (order.Status != OrderStatus.Draft)
            return BadRequest("Can only add items to Draft orders");

        var product = await _catalog.GetProduct(dto.ProductId);
        if (product is null) return BadRequest("Product not found in catalog");

        var item = new OrderItem
        {
            ProductId = product.Id,
            Sku = product.Sku,
            Qty = dto.Qty,
            UnitPrice = product.Price
        };

        order.Items.Add(item);
        _repo.Update(order);
        return Ok(order);
    }

    [HttpPost("{id}/confirm")]
    public ActionResult<Order> Confirm(Guid id)
    {
        var order = _repo.Get(id);
        if (order is null) return NotFound();

        order.Status = OrderStatus.Confirmed;
        _repo.Update(order);
        return Ok(order);
    }

    [HttpPost("{id}/cancel")]
    public ActionResult<Order> Cancel(Guid id)
    {
        var order = _repo.Get(id);
        if (order is null) return NotFound();

        order.Status = OrderStatus.Cancelled;
        _repo.Update(order);
        return Ok(order);
    }
}

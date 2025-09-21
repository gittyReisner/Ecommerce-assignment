using System;

namespace OrdersService.Dtos
{
    public class AddOrderItemDto
    {
        public Guid ProductId { get; set; }
        public int Qty { get; set; }
    }
}

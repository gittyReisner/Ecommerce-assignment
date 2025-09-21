# OrdersService

This service manages orders (draft → confirm/cancel) and communicates with CatalogService.

## How to Run

1. Navigate to the service folder:

```bash
cd OrdersService
```

Restore dependencies:
```bash
dotnet restore
```

Run the service:
```bash
dotnet run
```

The API will be available at:
```bash
https://localhost:5273
```
Endpoints

- POST /api/orders – Create draft order

- POST /api/orders/{id}/items – Add item by productId

- POST /api/orders/{id}/confirm – Confirm order

- POST /api/orders/{id}/cancel – Cancel order

- GET /api/orders/{id} – Get order by ID

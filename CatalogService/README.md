# CatalogService

This service manages products (CRUD).

## How to Run

1. Navigate to the service folder:

```bash
cd CatalogService
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
https://localhost:5249
```
Endpoints

- GET /api/products – List products

- GET /api/products/{id} – Get product by ID

- POST /api/products – Create product

- PATCH /api/products/{id} – Update product price/stock

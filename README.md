This project contains 3 services and a React micro-frontend for managing products and orders. It uses JSON files as mock databases instead of SQL Server or Docker (for now).

**Project Structure**

CatalogService/ – .NET 8 service for managing products (Product CRUD)
OrdersService/ – .NET 8 service for managing orders (Draft → Confirm/Cancel)
WebApp/ – React micro-frontend with Redux for displaying products and managing orders
products.json / orders.json – Mock DB files for each service

**Services**

CatalogService:

Product CRUD API
GET /api/products
POST /api/products
PATCH /api/products/:id

Products are stored in products.json

OrdersService:

Order management API

Flow:

Create a Draft order
Add items (validated against CatalogService)
Confirm / Cancel order
Data is stored in orders.json

WebApp:

React + Redux

Pages:

CatalogPage – display products

OrdersPage – create and manage orders

Communicates with both CatalogService and OrdersService

**Notes**

Temporary Visual Studio files (.vs/) are ignored in Git
If no products or orders appear, check that products.json and orders.json exist
All unfinished tasks (Docker, SQL DB, Kafka, CI/CD) are documented in Documentation.md

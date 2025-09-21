# Ecommerce Assignment

This repository contains a minimal ecommerce system with three services:

- **CatalogService** – Manages products (CRUD)
- **OrdersService** – Manages orders (draft → confirm/cancel)
- **WebApp** – React micro-frontend UI

The project is designed to demonstrate core technical skills, architecture, and prioritization.

---

## Architecture Overview

[WebApp] <--HTTP--> [OrdersService] <--HTTP--> [CatalogService]

- **Services communicate over HTTP**.  
- **Database**: JSON files simulate persistence (products.json, orders.json).  
- **React App**: Uses Redux for state management and communicates with APIs.

---

## Folder Structure

ecommerce/

├── CatalogService/

├── OrdersService/

└── WebApp/

---

## Services

| Service         | URL                     | Notes                            |
|-----------------|------------------------|---------------------------------|
| CatalogService  | https://localhost:5249 | Uses `products.json`             |
| OrdersService   | https://localhost:5273 | Uses `orders.json`               |
| WebApp          | http://localhost:5173  | React + Redux micro-frontend     |

---

## Getting Started

Run CatalogService and OrdersService

Open WebApp in browser

Create a draft order, select products, add quantities

Confirm or cancel the order

Observe total price and order status

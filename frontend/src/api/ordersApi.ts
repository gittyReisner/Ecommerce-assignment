export interface OrderItem {
  productId: string;
  sku: string;
  qty: number;
  unitPrice: number;
}

export type OrderStatus = "Draft" | "Confirmed" | "Cancelled";

export interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
}

// DTOs
export interface CreateOrderDto {
  customerId: string;
}

export interface AddOrderItemDto {
  productId: string;
  qty: number;
}

const API_URL = "http://localhost:5273/api/orders"; // שימי את הפורט של OrdersService שלך

export async function createOrder(dto: CreateOrderDto): Promise<Order> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

export async function addOrderItem(orderId: string, dto: AddOrderItemDto): Promise<Order> {
  const res = await fetch(`${API_URL}/${orderId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Failed to add item");
  return res.json();
}

export async function confirmOrder(orderId: string): Promise<Order> {
  const res = await fetch(`${API_URL}/${orderId}/confirm`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to confirm order");
  return res.json();
}

export async function cancelOrder(orderId: string): Promise<Order> {
  const res = await fetch(`${API_URL}/${orderId}/cancel`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to cancel order");
  return res.json();
}

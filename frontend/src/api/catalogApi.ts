export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  stock: number; 
}

const API_URL = "http://localhost:5249/api/products"; // שימי את הפורט של CatalogService שלך

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

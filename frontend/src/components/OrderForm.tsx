import { type Product } from "../api/catalogApi";

type OrderFormProps = {
  selectedOrderId: string | null;
  products: Product[];
  quantity: number;
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
  onQuantityChange: (qty: number) => void;
  onAddItem: () => void;
  onConfirm: () => void;
};

export const OrderForm = ({
  selectedOrderId,
  products,
  quantity,
  selectedProductId,
  onSelectProduct,
  onQuantityChange,
  onAddItem,
  onConfirm
}: OrderFormProps) => {
  if (!selectedOrderId) return null;

  return (
    <div>
      <h2>Add Item to Selected Order</h2>
      <select value={selectedProductId || ""} onChange={(e) => onSelectProduct(e.target.value)}>
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} - ${p.price}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={quantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
      />
      <button onClick={onAddItem}>Add Item</button>
      <button onClick={onConfirm}>Confirm Order</button>
    </div>
  );
};

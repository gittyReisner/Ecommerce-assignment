import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createNewOrder, addItemToOrder, confirmExistingOrder } from "./ordersSlice";
import { fetchProducts } from "../catalog/catalogSlice";
import { OrderForm } from "../../components/OrderForm";

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.catalog);
  const { orders, loading } = useAppSelector((state) => state.orders);

  const [customerId, setCustomerId] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCreateOrder = () => dispatch(createNewOrder({ customerId }));
  const handleAddItem = () => {
    if (!selectedOrderId || !selectedProductId) return;
    dispatch(addItemToOrder({ orderId: selectedOrderId, dto: { productId: selectedProductId, quantity } }));
  };
  const handleConfirmOrder = () => {
    if (!selectedOrderId) return;
    dispatch(confirmExistingOrder(selectedOrderId));
  };

  return (
    <div>
      <h1>Orders</h1>

      <div>
        <input
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <button onClick={handleCreateOrder}>Create Order</button>
      </div>

      <div>
        <h2>Orders List</h2>
        <ul>
          {orders.map((o) => (
            <li key={o.id}>
              {o.customerId} - {o.status} - Total: {o.totalAmount}
              <button onClick={() => setSelectedOrderId(o.id)}>Select</button>
            </li>
          ))}
        </ul>
      </div>

      <OrderForm
        selectedOrderId={selectedOrderId}
        products={products}
        quantity={quantity}
        selectedProductId={selectedProductId}
        onSelectProduct={setSelectedProductId}
        onQuantityChange={setQuantity}
        onAddItem={handleAddItem}
        onConfirm={handleConfirmOrder}
      />

      {loading && <p>Loading...</p>}
    </div>
  );
};

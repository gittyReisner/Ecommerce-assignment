import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { type Order, type CreateOrderDto, type AddOrderItemDto, createOrder, addOrderItem, confirmOrder } from "../../api/ordersApi";

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

// Thunks
export const createNewOrder = createAsyncThunk("orders/create", async (dto: CreateOrderDto) => {
  const order = await createOrder(dto);
  return order;
});

export const addItemToOrder = createAsyncThunk("orders/addItem", async ({ orderId, dto }: { orderId: string; dto: AddOrderItemDto }) => {
  const order = await addOrderItem(orderId, dto);
  return order;
});

export const confirmExistingOrder = createAsyncThunk("orders/confirm", async (orderId: string) => {
  const order = await confirmOrder(orderId);
  return order;
});

// Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create order";
      })
      .addCase(addItemToOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index >= 0) state.orders[index] = action.payload;
      })
      .addCase(addItemToOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to add item";
      })
      .addCase(confirmExistingOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmExistingOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index >= 0) state.orders[index] = action.payload;
      })
      .addCase(confirmExistingOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to confirm order";
      });
  },
});

export default ordersSlice.reducer;

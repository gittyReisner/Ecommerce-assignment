import { configureStore } from "@reduxjs/toolkit";
import catalogReducer from "../features/catalog/catalogSlice";
import ordersReducer from "../features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

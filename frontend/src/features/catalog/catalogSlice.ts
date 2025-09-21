import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type Product, getProducts } from "../../api/catalogApi";

export const fetchProducts = createAsyncThunk("catalog/fetchProducts", async () => {
  return getProducts();
});

type CatalogState = { products: Product[]; loading: boolean };

const initialState: CatalogState = { products: [], loading: false };

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => { state.loading = true; });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => { state.loading = false; });
  }
});

export default catalogSlice.reducer;

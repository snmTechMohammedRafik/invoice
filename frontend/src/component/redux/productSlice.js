import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

// Async thunks
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await getProducts();
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await getProductById(id);
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData) => {
    const response = await createProduct(productData);
    return response.data;
  }
);

export const modifyProduct = createAsyncThunk(
  "product/modifyProduct",
  async ({ id, productData }) => {
    const response = await updateProduct(id, productData);
    return response.data;
  }
);

export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);

// Product slice
const productSlice = createSlice({
    name: "product",
    initialState: {
      products: [],
      product: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload.data || [];
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchProductById.fulfilled, (state, action) => { // ✅ Ensure only ONE instance of this case exists
          state.product = action.payload.data;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.products.push(action.payload);
        })
        .addCase(modifyProduct.fulfilled, (state, action) => {
          const index = state.products.findIndex((product) => product._id === action.payload._id);
          if (index >= 0) {
            state.products[index] = action.payload;
          }
        })
        .addCase(removeProduct.fulfilled, (state, action) => {
          state.products = state.products.filter((product) => product._id !== action.payload);
        });
    },
  });
  

export default productSlice.reducer;

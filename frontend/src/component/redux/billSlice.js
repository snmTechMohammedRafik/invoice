
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createBill, getAllBills, getBillById, updateBill, deleteBill } from "../api/billApi";

// Thunks
export const fetchBills = createAsyncThunk("bills/fetchAll", async () => {
  const response = await getAllBills();
  return response.data.data; // Ensure we return only the data array
});

export const addBill = createAsyncThunk("bills/add", async (billData) => {
  const response = await createBill(billData);
  return response.data;
});

export const editBill = createAsyncThunk("bills/edit", async ({ _id, billData }) => {
  const response = await updateBill(_id, billData);
  return response.data;
});

export const removeBill = createAsyncThunk("bills/remove", async (_id) => {
  await deleteBill(_id);
  return _id;
});

// Fetch a single bill by ID
export const fetchBillById = createAsyncThunk("bills/fetchById", async (id) => {
  const response = await getBillById(id);
  return response.data;
});



const billSlice = createSlice({
  name: "bills",
  initialState: {
    bills: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload; // Now the correct array is stored
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBill.fulfilled, (state, action) => {
        state.bills.push(action.payload);
      })
      .addCase(editBill.fulfilled, (state, action) => {
        const index = state.bills.findIndex((bill) => bill._id === action.payload._id);
        if (index !== -1) state.bills[index] = action.payload;
      })
      .addCase(removeBill.fulfilled, (state, action) => {
        state.bills = state.bills.filter((bill) => bill._id !== action.payload);
      });
  },
});

export default billSlice.reducer;

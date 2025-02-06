import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "../api/authApi";

// Async thunk for register
export const register = createAsyncThunk("signIn/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await registerUser(userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    user: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.message = "Registration successful!";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = signInSlice.actions;
export default signInSlice.reducer;
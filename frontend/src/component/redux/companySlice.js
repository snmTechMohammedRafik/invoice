import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } from '../api/companyApi';

// Async thunks
export const fetchCompanies = createAsyncThunk('company/fetchCompanies', async () => {
  const response = await getCompanies();
  return response.data;
});

export const fetchCompanyById = createAsyncThunk('company/fetchCompanyById', async (id) => {
  const response = await getCompanyById(id);
  return response.data;
});

export const addCompany = createAsyncThunk('company/addCompany', async (companyData) => {
  const response = await createCompany(companyData);
  return response.data;
});

export const modifyCompany = createAsyncThunk('company/modifyCompany', async ({ id, companyData }) => {
  const response = await updateCompany(id, companyData);
  return response.data;
});

export const removeCompany = createAsyncThunk('company/removeCompany', async (id) => {
  await deleteCompany(id);
  return id;
});

// Company slice
const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [],
    company: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload.data || [];
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.company = action.payload;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
      })
      .addCase(modifyCompany.fulfilled, (state, action) => {
        const index = state.companies.findIndex((company) => company._id === action.payload._id);
        if (index >= 0) {
          state.companies[index] = action.payload;
        }
      })
      .addCase(removeCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter((company) => company._id !== action.payload);
      });
  },
});

export default companySlice.reducer;

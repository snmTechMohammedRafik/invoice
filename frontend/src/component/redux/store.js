import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import signInReducer from "./signInSlice";  // New signInSlice for registration
import productReducer from './productSlice';
import companyReducer from './companySlice';
import billReducer from './billSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    signIn: signInReducer,
    product: productReducer,  // Add product reducer here
    company :companyReducer,
    bills: billReducer, // Ensure 'bills' matches the state used in useSelector
  },
});

export default store;

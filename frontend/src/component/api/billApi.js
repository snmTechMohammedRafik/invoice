import axios from "axios";

const API_URL = "http://localhost:5000/api/bills"; // Change this to your backend URL

export const getAllBills = async () => {
  return await axios.get(API_URL);
};

export const getBillById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const createBill = async (billData) => {
  return await axios.post(API_URL, billData);
};

export const updateBill = async (id, billData) => {
  return await axios.put(`${API_URL}/${id}`, billData);
};

export const deleteBill = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

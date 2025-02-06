import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const createProduct = async (productData) => {
  return axios.post(API_URL, productData);
};

export const getProducts = async () => {
  return axios.get(API_URL);
};

export const getProductById = async (id) => {
  return axios.get(`${API_URL}/${id}`); // ✅ Keep `id` same
};

export const updateProduct = async (id, productData) => {
  return axios.put(`${API_URL}/${id}`, productData); // ✅ Keep `id` same
};

export const deleteProduct = async (id) => {
  return axios.delete(`${API_URL}/${id}`); // ✅ Keep `id` same
};

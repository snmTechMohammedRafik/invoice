import axios from 'axios';

const API_URL = 'http://localhost:5000/api/companies';

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const getConfig = () => {
  const token = getAuthToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

export const getCompanies = async () => {
  const config = getConfig();
  return await axios.get(API_URL, config);
};

export const getCompanyById = async (id) => {
  const config = getConfig();
  return await axios.get(`${API_URL}/${id}`, config);
};

export const createCompany = async (companyData) => {
  const config = getConfig();
  return await axios.post(API_URL, companyData, config);
};

export const updateCompany = async (id, companyData) => {
  const config = getConfig();
  return await axios.put(`${API_URL}/${id}`, companyData, config);
};

export const deleteCompany = async (id) => {
  const config = getConfig();
  return await axios.delete(`${API_URL}/${id}`, config);
};

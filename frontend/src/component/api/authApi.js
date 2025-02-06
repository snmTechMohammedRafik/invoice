import axios from "axios";

const API_URL = "http://localhost:5000/api/";

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}auth/login`, userData);
    return response; // Make sure the response contains the necessary data
  };

  export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}auth/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response; // Make sure the response contains the necessary data
  };
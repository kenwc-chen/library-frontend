import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

// 處理狀態的全域事件
import { reactive } from 'vue';
export const authState = reactive({
  isAuthenticated: !!localStorage.getItem('token'),
});

// 登入功能
export const login = async (phoneNumber, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, { phoneNumber, password });
    if (response.data) {
      localStorage.setItem('token', response.data);  // Store JWT token in localStorage
      authState.isAuthenticated = true;  // Trigger state change
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Login failed');
  }
};

// 註冊功能
export const register = async (phoneNumber, password, userName) => {
  try {
    const response = await axios.post(`${API_URL}users/register`, { phoneNumber, password, userName });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Registration failed');
  }
};

// 登出功能
export const logout = () => {
  localStorage.removeItem('token');  // Remove JWT token from localStorage
  authState.isAuthenticated = false;  // Trigger state change
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  return authState.isAuthenticated;  // Use reactive state to check authentication
};

// Get the current user's token
export const getToken = () => {
  return localStorage.getItem('token');
};

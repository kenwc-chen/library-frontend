import axios from 'axios';
import { getToken } from './auth';  // Get JWT token from auth.js

const API_URL = 'http://localhost:8080/api/';

// Get all available books for borrowing
export const getAvailableBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}borrow`, {
      headers: {
        Authorization: `Bearer ${getToken()}`  // Attach JWT token in the request header
      }
    });
    return response.data;  // Return book data
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Failed to load books');
  }
};

// Borrow a book, passing the inventoryId to specify the book
export const borrow = async (inventoryId) => {
  try {
    const response = await axios.post(`${API_URL}borrow`, { inventoryId }, {
      headers: {
        Authorization: `Bearer ${getToken()}`  // Attach JWT token in the request header
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Failed to borrow book');
  }
};

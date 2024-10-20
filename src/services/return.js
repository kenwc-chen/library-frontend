import axios from 'axios';
import { getToken } from './auth';  // 從 auth.js 中獲取已登入用戶的 JWT token

const API_URL = 'http://localhost:8080/api/';  // 後端 API 的基礎 URL

// 獲取用戶已借閱的書籍列表
export const getBorrowedBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}return/borrowed-books`, {  // 確認 API 路徑
      headers: {
        Authorization: `Bearer ${getToken()}`  // 在請求標頭中附加 JWT token
      }
    });
    return response.data;
  } catch (error) {
    // 捕捉具體的錯誤訊息，返回具體的錯誤或通用錯誤
    throw new Error(error.response?.data || 'Failed to load borrowed books');
  }
};

// 還書功能，傳遞 inventoryId 來指定要還的書籍
export const returnBook = async (inventoryId) => {
  try {
    const response = await axios.post(`${API_URL}return`, { inventoryId }, {
      headers: {
        Authorization: `Bearer ${getToken()}`  // 在請求標頭中附加 JWT token
      }
    });
    return response.data;
  } catch (error) {
    // 捕捉具體的錯誤訊息，返回具體的錯誤或通用錯誤
    throw new Error(error.response?.data || 'Failed to return book');
  }
};

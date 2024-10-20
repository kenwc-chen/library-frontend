<template>
  <div class="return">
    <h2>Return Books</h2>
    <ul>
      <li v-for="book in borrowedBooks" :key="book.inventoryId">
        <h3>{{ book.name }}</h3>
        <p>Author: {{ book.author }}</p>
        <p>Status: {{ book.status }}</p>
        <button @click="returnBook(book.inventoryId)">Return</button>
      </li>
    </ul>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getBorrowedBooks, returnBook as returnBookApi } from '../services/return'; // 確保 import 正確
import { useRouter } from 'vue-router';

export default {
  setup() {
    const borrowedBooks = ref([]); // 儲存用戶已借閱的書籍
    const errorMessage = ref('');
    const successMessage = ref('');
    const router = useRouter();

    const fetchBorrowedBooks = async () => {
      try {
        borrowedBooks.value = await getBorrowedBooks(); // 從 API 獲取借閱書籍
      } catch (error) {
        errorMessage.value = 'Failed to load borrowed books.'; // 顯示錯誤訊息
      }
    };

    const returnBook = async (inventoryId) => {
      try {
        await returnBookApi(inventoryId); // 調用 API 還書
        successMessage.value = 'Book returned successfully!';
        errorMessage.value = '';
        fetchBorrowedBooks(); // 還書後重新加載借閱書籍列表
      } catch (error) {
        errorMessage.value = 'Failed to return book: ' + error.message; // 顯示錯誤訊息
        successMessage.value = '';
      }
    };

    onMounted(() => {
      fetchBorrowedBooks(); // 頁面加載後加載借閱書籍
    });

    return { borrowedBooks, returnBook, errorMessage, successMessage };
  }
};
</script>

<style scoped>
.return {
  max-width: 600px;
  margin: auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>

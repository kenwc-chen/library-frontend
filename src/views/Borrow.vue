<template>
  <div class="borrow">
    <h2>Borrow Books</h2>
    <ul>
      <li v-for="book in availableBooks" :key="book.inventoryId">
        <h3>{{ book.name }}</h3>
        <p>Author: {{ book.author }}</p>
        <p>Status: {{ book.status }}</p>
        <button v-if="book.status === 'available'" @click="borrowBook(book.inventoryId)">Borrow</button>
        <p v-else>This book is currently borrowed</p>
      </li>
    </ul>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAvailableBooks, borrow } from '../services/borrow';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const availableBooks = ref([]);
    const errorMessage = ref('');
    const successMessage = ref('');
    const router = useRouter();

    const fetchBooks = async () => {
      try {
        availableBooks.value = await getAvailableBooks();
      } catch (error) {
        errorMessage.value = 'Failed to load available books.';
      }
    };

    const borrowBook = async (inventoryId) => {
      try {
        await borrow(inventoryId);
        successMessage.value = 'Book borrowed successfully!';
        errorMessage.value = '';
        fetchBooks();  // 刷新可借書籍列表
      } catch (error) {
        errorMessage.value = 'Failed to borrow book: ' + error.message;
        successMessage.value = '';
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return { availableBooks, borrowBook, errorMessage, successMessage };
  }
};
</script>

<style scoped>
.borrow {
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
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>

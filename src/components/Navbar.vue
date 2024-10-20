<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li v-if="!isAuthenticated">
        <router-link to="/login" active-class="active">Login</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/register" active-class="active">Register</router-link>
      </li>

      <li v-if="isAuthenticated">
        <router-link to="/borrow" active-class="active">Borrow Books</router-link>
      </li>
      <li v-if="isAuthenticated">
        <router-link to="/return" active-class="active">Return Books</router-link>
      </li>

      <li v-if="isAuthenticated">
        <a href="#" @click="logoutUser">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { authState, logout } from '../services/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const logoutUser = () => {
      logout(); // Remove JWT token
      router.push('/login'); // Redirect to login page
    };

    return { isAuthenticated: authState.isAuthenticated, logoutUser };
  }
};
</script>

<style scoped>
/* Styles for the navbar */
.navbar {
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: center;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li {
  display: inline;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  transition: background-color 0.3s ease;
}

.nav-links a:hover {
  background-color: #555;
  border-radius: 5px;
}
</style>

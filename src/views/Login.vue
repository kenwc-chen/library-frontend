<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input v-model="loginForm.phoneNumber" type="text" id="phoneNumber" required pattern="[0-9]{10}" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="loginForm.password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { login } from '../services/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const loginForm = ref({
      phoneNumber: '',
      password: ''
    });
    const errorMessage = ref('');
    const router = useRouter();

    const loginUser = async () => {
      try {
        await login(loginForm.value.phoneNumber, loginForm.value.password);
        router.push('/borrow');  // Redirect to borrow page after successful login
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    return { loginForm, loginUser, errorMessage };
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.error {
  color: red;
}
</style>

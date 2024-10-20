<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input v-model="registerForm.phoneNumber" type="text" id="phoneNumber" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="registerForm.password" type="password" id="password" required />
      </div>
      <div>
        <label for="userName">Username:</label>
        <input v-model="registerForm.userName" type="text" id="userName" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { register } from '../services/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const registerForm = ref({
      phoneNumber: '',
      password: '',
      userName: ''
    });
    const errorMessage = ref('');
    const successMessage = ref('');
    const router = useRouter();

    const registerUser = async () => {
      try {
        await register(registerForm.value.phoneNumber, registerForm.value.password, registerForm.value.userName);
        successMessage.value = 'Registration successful! Redirecting to login...';
        errorMessage.value = '';
        setTimeout(() => router.push('/login'), 2000); // 2 秒後導向登入頁面
      } catch (error) {
        errorMessage.value = error.message;
        successMessage.value = '';
      }
    };

    return { registerForm, registerUser, errorMessage, successMessage };
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: auto;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>

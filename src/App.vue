<template>
  <div>
    <Navbar /> <!-- 確保導航欄組件正確顯示 -->
    <router-view /> <!-- 用於渲染路由視圖 -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { ref, provide, watchEffect } from 'vue';
import { getToken } from './services/auth';

export default {
  setup() {
    const isLoggedIn = ref(!!getToken());

    // 使用 watchEffect 監控登入狀態是否改變
    watchEffect(() => {
      isLoggedIn.value = !!getToken();  // 每次 token 改變時，動態更新登入狀態
    });

    provide('isLoggedIn', isLoggedIn);  // 通過 provide 傳遞狀態

    return {};
  },
  components: {
    Navbar,
  },
};
</script>

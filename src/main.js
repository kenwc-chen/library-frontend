import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 引入路由設定

// 創建 Vue 應用實例，並將路由掛載到應用中
const app = createApp(App);

app.use(router);  // 使用 Vue Router
app.mount('#app');  // 將應用掛載到 DOM 中的 id 為 "app" 的元素上

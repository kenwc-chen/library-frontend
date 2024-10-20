import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,  // 前端運行在 3000 端口
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // 將所有 /api 請求代理到後端
        changeOrigin: true,
        secure: false
      }
    }
  }
});

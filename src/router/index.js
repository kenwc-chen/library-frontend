import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Borrow from '../views/Borrow.vue';
import Return from '../views/Return.vue';
import { isAuthenticated } from '../services/auth';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/borrow',
    name: 'Borrow',
    component: Borrow,
    meta: { requiresAuth: true } // 需要身份驗證才能訪問
  },
  {
    path: '/return',
    name: 'Return',
    component: Return,
    meta: { requiresAuth: true } // 需要身份驗證才能訪問
  },
  {
    path: '/',
    redirect: '/login' // 默認重定向到登入頁面
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守衛：檢查是否已登入才能訪問受保護的路由
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next('/login'); // 未登入則重定向到登入頁面
    } else {
      next(); // 已登入則允許訪問
    }
  } else {
    next(); // 不需要驗證的路由，直接放行
  }
});

export default router;

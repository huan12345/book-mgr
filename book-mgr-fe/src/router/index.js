import { createRouter, createWebHashHistory } from 'vue-router';
//前端路由配置
const routes = [
  {
    path: '/auth',//认证路径
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),//认证的异步渲染
  },
//  {
//    path: '/about',
//    name: 'About',
//    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
//  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

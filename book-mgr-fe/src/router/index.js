import { createRouter, createWebHashHistory } from 'vue-router';
//前端路由配置，从上到下，先匹配成功的就使用
const routes = [
  {
    path: '/auth',//认证路径
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),//认证的异步渲染
  },
  {
    path: '/',// 基础布局
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),//认证的异步渲染
    children: [
      {
        path: 'books',// 图书管理路径
        name: 'Books',
        component: () => import(/* webpackChunkName: "Books" */ '../views/Books/index.vue'),
      },
    ],
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

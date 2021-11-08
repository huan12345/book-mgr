import { createRouter, createWebHashHistory } from 'vue-router';
//前端路由地址，从上到下匹配，数组顺序匹配
const routes = [
  {
    path: '/auth',// /auth显示认证页面
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),//认证的异步渲染
  },
  {
    path: '/',// /显示基础页面
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),//认证的异步渲染
    // 子路由，渲染于<router-view />路由容器中
    children: [
      {
        path: 'books',// /books：用'../views/Books/index.vue'渲染<router-view />路由容器
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

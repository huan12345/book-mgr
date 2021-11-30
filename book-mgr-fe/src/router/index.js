import { createRouter, createWebHashHistory } from 'vue-router';
//前端路由地址，从上到下匹配，数组顺序匹配
const routes = [
  {
    // 认证路径
    path: '/auth', 
    name: 'Auth',

    // 认证响应
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'), // 异步渲染
  },
  {
    path: '/', 
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),

    // 子路由
    children: [
      {
        path: 'books',
        name: 'Books',

        // /books：用'../views/Books/index.vue'渲染<router-view />路由容器
        component: () => import(/* webpackChunkName: "Books" */ '../views/Books/index.vue'),
      },
      {
        path: 'books/:id',
        name: 'BookDetail',
        component: () => import(/* webpackChunkName: "BooksDetail" */ '../views/BookDetail/index.vue'),
      },
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/Users/index.vue'),
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

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';//路由
import store from './store';
import Antd from 'ant-design-vue';//标签样式

import 'ant-design-vue/dist/antd.css';//引进样式
//use注册，注册完后作为全局组件去使用
createApp(App)
    .use(store)
    .use(router)
    .use(Antd)
    .mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';// 路由
import store from './store';
import Antd from 'ant-design-vue';// ant-design样式（input、a-tabs等）
import SpaceBetween from './components/SpaceBetween/index.vue';// 两端对齐
import FlexEnd from './components/FlexEnd/index.vue';// 两端对齐

import 'ant-design-vue/dist/antd.css';//  ant-design样式

//use注册全局组件，注册完后作为全局组件去使用
createApp(App)
    .use(store)
    .use(router)
    .use(Antd)// ant-design样式
    .component('space-between',SpaceBetween)// 弹性布局，两端对齐
    .component('flex-end',FlexEnd)// 全局组件：末端对齐
    .mount('#app');

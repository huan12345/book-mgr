//基础布局框架逻辑
import { defineComponent } from 'vue';// 组件
import Nav from './Nav/index.vue';// navigation导航

export default defineComponent ({
    components: {
        AppNav: Nav,
    },
}); 
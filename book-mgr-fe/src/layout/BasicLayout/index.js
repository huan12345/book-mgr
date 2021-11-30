//基础布局框架逻辑
import { defineComponent } from 'vue';// 代码提示
import Nav from './Nav/index.vue';// 左下：navigation导航

export default defineComponent ({
    // 注册Nav
    components: {
        AppNav: Nav,// 左下导航
    },
}); 
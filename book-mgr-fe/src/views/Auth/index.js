import { defineComponent, reactive,ref } from 'vue';
import { UserOutlined, LockOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons-vue'/* 图标 */
import { auth } from '@/service';

export default defineComponent({
    components: {
        UserOutlined,/* 用户图标 */
        LockOutlined,/* 锁 */
        KeyOutlined,/* 钥匙 */
        MailOutlined,/* 邀请码 */
    },
    setup() {
        //regForm创建表单数据
        const regForm = reactive({
            account: '',
            password: '',
        });

    //注册，发送http请求，带过去account、password
    const register = () => {
        auth.register(regForm.account, regForm.password);
    };

    return {
        regForm,

        register,
    };
    },
});
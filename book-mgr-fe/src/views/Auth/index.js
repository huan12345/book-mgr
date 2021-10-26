//认证逻辑
import { defineComponent, reactive,ref } from 'vue';//defineComponent组件解释；reactive：响应数据
import { UserOutlined, LockOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons-vue'/* 图标 */
import { auth } from '@/service';// 认证请求服务
import { result } from '@/helpers/utils';// 请求成功与失败的处理
import { message } from 'ant-design-vue';//提示框

export default defineComponent({
    //注册
    components: {
        UserOutlined,/* 用户图标 */
        LockOutlined,/* 锁 */
        KeyOutlined,/* 钥匙 */
        MailOutlined,/* 邀请码 */
    },
    setup() {
        //获取service表单数据，reactive：响应式数据集合
        const regForm = reactive({
            account: '',
            password: '',
            inviteCode:'',
        });
        //注册逻辑：获取数据后，
        const register = async () => {
            //message提示，前端拦截
             if (regForm.account === '') {
                message.info('请输入账户');
                return;
            }
            if (regForm.password === '') {
                message.info('请输入密码');
                return;
            } 
            if (regForm.inviteCode === '') {
                message.info('请输入邀请码');
                return;
            }
            //res 获取注册者表单的数据
            const res = await auth.register(
                regForm.account,
                regForm.password,
                regForm.inviteCode,
                );
            //结果逻辑
            result(res) // 结果函数
                .success((data) => {
                    message.success(data.msg);
                });
                
        };

        //登录用到表单数据，reactive相应式数据，实现双向绑定
        const loginForm = reactive({
            account: '',
            password: '',
        });
        //登录逻辑
        const login = async () => {
            if (loginForm.account === '') {
                message.info('请输入账户');
                return;
            }
            if (loginForm.password === '') {
                message.info('请输入密码');
                return;
            } 
            //res 获取登入者表单的数据
            const res = await auth.login(loginForm.account, loginForm.password);

            result(res)
                .success((data) => {
                    message.success(data.msg);
                });
        };

    return {
        // 注册相关数据
        regForm,
        register,
        // 登入相关数据
        login,
        loginForm,
    };
    },
});
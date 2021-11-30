// 认证逻辑
import { defineComponent, reactive,ref } from 'vue'; //defineComponent：组件提示；reactive：响应式数据，接收客户端发送过来的请求
import { UserOutlined, LockOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons-vue' // 图标
import { auth } from '@/service'; // 认证请求服务
import { result } from '@/helpers/utils'; // 发往后端http请求成功与失败的处理
import { message } from 'ant-design-vue'; // 提示框

export default defineComponent({

    // 注册图标
    components: {
        UserOutlined, /* 用户图标 */
        LockOutlined, /* 锁 */
        KeyOutlined,  /* 钥匙 */
        MailOutlined, /* 邀请码 */
    },

    setup() {

        // regForm用于获取请求服务发送过来的数据，reactive：响应式数据集合
        const regForm = reactive({
            account: '',
            password: '',
            inviteCode:'',
        });

        // 注册逻辑：获取数据后，
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

            // 调用auth.register发送http请求给后端，带过去账户、密码、邀请码
            const res = await auth.register(
                regForm.account,
                regForm.password,
                regForm.inviteCode,
                );

            // 后端响应结果
            result(res) // 传递后端的响应体
                .success((data) => {
                    message.success(data.msg); // 成功提示
                });
                
        };

        // 登录用的表单数据，reactive相应式数据，实现双向绑定
        const loginForm = reactive({
            account: '',
            password: '',
        });

        // 登录逻辑
        const login = async () => {
            if (loginForm.account === '') {
                message.info('请输入账户');
                return;
            }
            if (loginForm.password === '') {
                message.info('请输入密码');
                return;
            } 

            // 调用auth.login发送给后端http请求，带过去账户、密码、邀请码
            const res = await auth.login(loginForm.account, loginForm.password);

            // 后端响应结果
            result(res)
                .success((data) => {
                    message.success(data.msg);
                });
        };

    return {
        
        // 供模板使用
        regForm, // 注册信息
        register, // 注册逻辑
        
        login, // 登入信息
        loginForm, // 登入逻辑
    };
    },
});
// 认证请求服务，发给后端接口
import axios from 'axios';// axios：请求库：简化写请求的流程
// 注册请求（axios.post其实是一个promise）
export const register = (account,password,inviteCode) => {
    return axios.post('http://localhost:3000/auth/register', {
        account,
        password,
        inviteCode,
    });
};

// 登录请求
export const login = (account,password) => {
    return axios.post('http://localhost:3000/auth/login',{
        account,
        password,
    })
};

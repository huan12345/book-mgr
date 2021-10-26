//认证的请求服务
import axios from 'axios';//axios：请求库，简化写请求的流程
//返回，axios发送的请求
export const register = (account,password,inviteCode) => {
    return axios.post('http://localhost:3000/auth/register', {
        account,
        password,
        inviteCode,
    });
};

export const login = (account,password) => {
    return axios.post('http://localhost:3000/auth/login',{
        account,
        password,
    })
};

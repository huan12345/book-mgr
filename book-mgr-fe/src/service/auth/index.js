import axios from 'axios';
//axios发送请求
export const register = (account,password) => {
    axios.post('http://localhost:3000/auth/register', {
        account,
        password,
    });
};

export const login = () => {

};
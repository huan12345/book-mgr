//认证的请求服务
import axios from 'axios';//axios：请求库，简化写请求的流程
//返回，axios发送的请求
// 发送请求：add添加书籍接口
export const add = (form) => {
    // 获取信息
    return axios.post(
        'http://localhost:3000/book/add', 
        form,
    );
};
// 发送请求：list书籍列表接口
export const list = (data) => {
    return axios.get(
        'http://localhost:3000/book/list', 
        {
            params: data,
        },
    );
};

// 发送请求：删除书籍接口
export const remove = (id) => {
    return axios.delete(
        `http://localhost:3000/book/${id}`, 
    );
};

// 发送请求：删除书籍接口
export const updateCount = (data = {}) => {
    return axios.post(
        `http://localhost:3000/book/update/count`, 
        data,
    );
};

// 编辑书籍接口
export const update = (data = {}) => {
    return axios.post(
        `http://localhost:3000/book/update`, 
        data,
    );
};
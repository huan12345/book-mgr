// 添加书籍请求服务
import axios from 'axios'; //axios：请求库，简化写请求的流程

// 添加书籍
export const add = (form) => {

    // 向后端发送http请求
    return axios.post(
        'http://localhost:3000/book/add', 
        form,
    );
};

// list书籍列表
export const list = (data) => {
    return axios.get(
        'http://localhost:3000/book/list', 
        {
            params: data,
        },
    );
};

// 删除书籍
export const remove = (id) => {
    return axios.delete(
        `http://localhost:3000/book/${id}`, // 书籍id
    );
};

// 更新库存
export const updateCount = (data = {}) => {
    return axios.post(
        `http://localhost:3000/book/update/count`, 
        data,
    );
};

// 修改书籍
export const update = (data = {}) => {
    return axios.post(
        `http://localhost:3000/book/update`, 
        data,
    );
};

// 书籍详细信息
export const detail = (id) => {
    return axios.get(
        `http://localhost:3000/book/detail/${id}`,
    );
};
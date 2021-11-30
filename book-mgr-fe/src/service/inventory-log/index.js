// 出入库日志
import axios from 'axios'; 
// 出入库日志列表： 默认：入库、第一页、20条
export const list = (id, type = 'IN_COUNT', page = 1, size = 20) => {

    // http请求
    return axios.get(
        'http://localhost:3000/inventory-log/list', 
        {
            // 参数
            params: {
                id,
                type,
                page,
                size,
            },
        },
    );
};

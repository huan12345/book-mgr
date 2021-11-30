import { message } from 'ant-design-vue'; // 提示框
import { formatCountdown } from 'ant-design-vue/lib/statistic/utils';

// 处理后端发来的http响应，自动显示错误提示
export const result = (response,authShowErrorMsg = true) => {
    const { data } = response;// 响应数据

    // code = 0，请求失败时
    if ((data.code === 0) && authShowErrorMsg) {
        message.error(data.msg);
    }

    return {
        // 成功时做的事情
        success(cb) {
            if (data.code !== 0) {
                cb(data, response);
            }
            return this;// 整个对象返回
        },
        // 失败时做的事情
        fail(cb) {
            if (data.code === 0) {
                cb(data, response);
            }
            return this;
        },
        // 默认都会做的事情
        finally(cb) {
            cb(data, response);
            return this;
        },
    };
};

// 复制clone
export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// 时间补全 1 ---> 01
const tsPadStart = (str) => {
    str = String(str);
    // 补全
    return str.padStart(2, '0');
};

// 格式化时间戳ts
export const formatTimestamp = (ts) => {
    const date = new Date(Number(ts)); // Number(ts)字符串转数字

    const YYYY = date.getFullYear(); // 年
    const MM = tsPadStart(date.getMonth() + 1); // 月
    const DD = tsPadStart(date.getDate()); // 日

    const hh = tsPadStart(date.getHours()); // 时
    const mm = tsPadStart(date.getMinutes()); // 分
    const ss = tsPadStart(date.getSeconds()); // 秒

    return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}` ;
};
  
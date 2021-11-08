import { message } from 'ant-design-vue';//提示框
import { formatCountdown } from 'ant-design-vue/lib/statistic/utils';
// 处理请求数据并拿到结果
export const result = (response,authShowErrorMsg = true) => {
    const { data } = response;// 请求数据
    // code = 0，请求失败时，提示框提示
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
// 复制
export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
// 格式化时间戳ts
export const formatTimestamp = (ts) => {
    const date = new Date(Number(ts)); // Number(ts)字符串转数字

    const YYYY = date.getFullYear();// 年
    const MM = date.getMonth() + 1;// 月
    const DD = date.getDate();// 日

    const hh = date.getHours();// 时
    const mm = date.getMinutes();// 分
    const ss = date.getSeconds();// 秒

    return `${YYYY}/${MM}/${DD} ${hh}${mm}:${ss}` ;
};
  
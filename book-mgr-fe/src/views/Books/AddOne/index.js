import { defineComponent, reactive } from 'vue';// reactive响应式的数字集合
import { book } from '@/service';// 获取add请求数据
import { message } from 'ant-design-vue';// 提示
import { result,clone } from '@/helpers/utils';// result 判断响应内容成功或者失败；clone 复制
// 添加书籍表单内的信息
const defaultFormData = {
        name: '',
        price: 0,
        author: '',
        publishDate: 0,
        classify: '',
        count: '',
}

export default defineComponent({
    // 允许外面传递进来的参数
    props: {
        show: Boolean, // 弹窗开关
    },
    // 添加弹框的执行
   setup(props,context) {
       // 响应式的添加书籍表单
        const addForm = reactive(clone(defaultFormData));
        // 点击ok时事件
        const submit = async () => {
            const form = clone(addForm);// 复制表单，将时间改成时间戳形式
            form.publishDate = addForm.publishDate.valueOf();// 将时间改成时间戳形式
            const res = await book.add(form);// book数据保存到服务端
            // 添加成功时事件
            result(res)
                .success((d, { data }) => {
                    // 清空表单：合并addForm, defaultFormData两数组
                    Object.assign(addForm, defaultFormData);
                    message.success(data.msg);// 提示添加成功
                });
        };
        // 关闭弹窗，更新update成false
        const close = () => {
            context.emit('update:show', false);// 更新传递进来的show成false
        };

        return {
            addForm,
            submit,
            props,
            close,
        };
   },
});
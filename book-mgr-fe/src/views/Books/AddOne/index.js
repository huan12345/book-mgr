import { defineComponent, reactive } from 'vue'; // reactive响应式的数字集合
import { book } from '@/service'; // 发往后端http请求，添加书籍
import { message } from 'ant-design-vue'; // 提示
import { result,clone } from '@/helpers/utils';// result 判断发给后端http请求成功或者失败；clone 复制；

// 添加书籍表单数据集合
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
        show: Boolean, // add弹窗开关
    },

    // 添加弹框的执行
   setup(props,context) {

       // 响应式的添加书籍表单
        const addForm = reactive(clone(defaultFormData));

        // 点击弹框ok按钮事件
        const submit = async () => {
            const form = clone(addForm); // 复制表单，目的：将时间改成时间戳形式
            form.publishDate = addForm.publishDate.valueOf(); // 将时间改成时间戳形式
            const res = await book.add(form); // http发送给后端添加书籍form

            // http请求成功时事件
            result(res)
                .success((d, { data }) => {
                    // 清空表单：defaultFormData空数据合并addForm
                    Object.assign(addForm, defaultFormData);
                    message.success(data.msg); // 提示添加成功
                });
        };

        // 关闭弹窗，update:show实现双向绑定，提供v-model指令
        const close = () => {
            context.emit('update:show', false);// emit：触发自定义事件：更新传递进来的show成false
        };

        return {
            addForm, // 添加书籍表单
            submit,  // OK按钮
            props,   // 外来参数：弹框开关
            close,   // 关闭弹框
        };
   },
});
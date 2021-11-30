import { defineComponent, reactive,watch } from 'vue'; // reactive响应式的数字集合
import { book } from '@/service'; // 获取add请求数据
import { message } from 'ant-design-vue'; // 提示
import { result,clone } from '@/helpers/utils'; // result 判断响应内容成功或者失败；clone 复制
import moment from 'moment'; // 处理合并对象，时间

export default defineComponent({

    // 允许外面传递进来的参数，弹窗开关
    props: {
        show: Boolean, // add弹框
        book: Object,  // 书既数据
    },

    // 编辑弹框的执行
   setup(props,context) {

       // 数据
       const editForm = reactive({
        name: '',
        price: 0,
        author: '',
        publishDate: 0,
        classify: '',
       });

        // 关闭弹窗，更新update成false
        const close = () => {
            context.emit('update:show', false); // 更新传递进来的show成false
        };

        // 监听编辑后book信息的改变，current：变换的信息
        watch(() => props.book, (current) => {
            // 数据传入editForm
            Object.assign(editForm, current);
            // 修改时间正确
            editForm.publishDate = moment(Number(editForm.publishDate));
        });

        // 编辑按钮，获取数据，合并对象
        const submit = async () => {
            // http修改书籍
            const res = await book.update({
                id: props.book._id,// id
                name: editForm.name,
                price: editForm.price,
                author: editForm.author,
                publishDate: editForm.publishDate.valueOf(),
                classify: editForm.classify,
               
            });

             // http成功响应
            result(res)
                .success(({ data, msg }) => {
                    context.emit('update', data); // 更新列表信息
                    message.success(msg);
                    close(); // 关闭弹框
                });
        };

        return {
            editForm, // 编辑表单
            submit, // 编辑按钮
            props, // 监听book数据的改变
            close, // 关闭弹框
        };
   },
});
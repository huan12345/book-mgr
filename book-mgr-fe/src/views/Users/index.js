import { defineComponent, ref, onMounted } from 'vue';
import { user } from '@/service';
import { message } from 'ant-design-vue';
import { result , formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';

// 用户列表项
const columns = [
    {
        title: '账户',
        dataIndex: 'account',
    },
    {
        title: '创建日期',
        slots: {
            customRender: 'createdAt',
        },
    },   
    {
        title: '操作',
        slots: {
            customRender: 'action',
        },
    },

]

export default defineComponent({
    components: {
        AddOne,
    },
    setup() {
        const list = ref([]); // 用户列表
        const total = ref(0); // 用户总数
        const curPage = ref(1); // 当前页
        const showAddModal = ref(false); // 添加用户弹框
        const keyword = ref(''); // 搜索用户关键字
        const isSearch = ref(false); // 当前搜索状态

        // 获取用户列表
        const getUser = async () => {
            // http用户列表
            const res = await user.list(curPage.value, 10, keyword.value);

            // 响应返回列表，总数
            result(res)
                .success(({ data: {list: refList, total: resTotal} }) => {
                    total.value = resTotal;
                    list.value = refList;
                })
        };

        onMounted(() => {
            getUser();
        });

        // 删除用户
        const remove = async ({ _id }) => {
            // http删除
            const res = await user.remove(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    getUser(); // 展示列表
                });
        };

        // 分页
        const setPage = (page) => {
            curPage.value = page;

            getUser();
        };

        // 重置密码
        const resetPassword = async ({ _id }) => {
            const res = await user.resetPassword(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                });
        };

        // 查询用户
        const onSearch = () => {
            getUser();
            isSearch.value = !!keyword.value; // 搜索状态（输入框有无值时）
        };

        // 返回菜单
        const backAll = () => {
            isSearch.value = false;
            keyword.value = '';
            getUser();
        };

        return {
            list, // 用户列表
            total, // 用户条数
            curPage, // 当前页
            columns, // 用户列表项
            formatTimestamp, // 格式化的时间
            remove, // 删除用户
            showAddModal, // 添加用户弹框
            getUser, // 获取用户列表
            setPage, // 分页
            resetPassword, // 重置密码
            isSearch, // 搜索状态
            keyword, // 搜索用户关键字
            backAll, // 返回
            onSearch, // 搜索用户
        };
    },

});
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // useRoute:获取书籍的信息；useRouter：操作路由的方法
import { result, formatTimestamp } from '@/helpers/utils'; // http返回； 时间补全
import { book, inventoryLog } from '@/service'; // http： 书籍列表、出入库日志列表
import { CheckOutlined } from '@ant-design/icons-vue'; // 出入库icon
import { message } from 'ant-design-vue';
import Update from '@/views/Books/Update/index.vue'; // 编辑

// 出入库列表表格列项数据
const columns = [
    {
        title: '数量',
        dataIndex: 'num',
    },
    {
        title: '操作时间',
        slots: {
            customRender: 'createdAt',
        },
    },
];

export default defineComponent({
    components: {
        Update, // 编辑
        CheckOutlined, // 出入库icon
    },
    setup() {
        const route = useRoute(); // 获取书籍信息
        const router = useRouter(); // 实现路由操作

        // 获取id数据
        const { id } = route.params; // 获取书籍的id
        const detailInfo = ref({}); // 响应式详细信息
        const log = ref([]); // 出入库库日志列表
        const showUpdateModal = ref(false); // 编辑弹框默认不显示
        const logTotal = ref(0); // 日志记录总数
        const logCurPage = ref(1); // 日志当前页 
        const curLogType = ref('IN_COUNT'); // 当前默认入库

        // 获取书籍详细信息
        const getDetail = async () => {
            const res = await book.detail(id); // http后端获取详细信息

            // 对信息进行处理
            result(res)
                .success(({ data }) => {
                    // 书籍详细信息
                    detailInfo.value = data; 
                });
        };

        // 获取出入库日志
        const getInventoryLog = async () => {
            // http
            const res = await inventoryLog.list(
                id, // 书籍id
                curLogType.value, // 出或入
                logCurPage.value,  // 当前页
                10, // 10条
            );

            // list 出入库列表, total 日志记录条数
            result(res)
                .success(({ data: { list, total } }) => {
                    log.value = list; // 列表
                    logTotal.value = total; // 条数
                });
        };

        // 挂载回调
        onMounted(() => {
            getDetail(); // 获取书籍详情
            getInventoryLog(); // 获取出入库日志列表
        });

        // 删除
        const remove = async () => {
            // http后端删除book
            const res = await book.remove(id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg); // 删除成功
                    router.replace('/books'); // router路由操作：跳转到页表；replace：不能回到被删除书籍的页面
                });
        };

        // 编辑
        const update = (book) => {
            // 合并数据
            Object.assign(detailInfo.value, book);
        };

        // 分页切换的时候
        const setLogPage = (page) => {
            logCurPage.value = page; // 页码

            getInventoryLog(); // 日志列表
        };

        // 筛选日志
        const logFilter = (type) => {
            curLogType.value = type;
            getInventoryLog();
        };

        return {
            d: detailInfo, // 书籍详细信息
            formatTimestamp, // 格式化时间
            remove, // 删除
            showUpdateModal, // 编辑弹框
            update, // 编辑
            log, // 出入库库日志列表
            logTotal, // 日志记录总数
            setLogPage, // 日志分页
            columns, // 出入库列表项
            logFilter, // 筛选日志（区分出入库）
            curLogType, // 出入库icon
            logCurPage, // 日志当前页 
        };
    },
});
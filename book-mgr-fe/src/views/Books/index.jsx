import { defineComponent, ref, onMounted } from 'vue'; // ref响应式变量，控制弹框的显示与隐藏
import { book } from '@/service';// 列表数据
import { message, Modal, Input } from 'ant-design-vue';// 提示框
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';// 书籍添加
import Update from './Update/index.vue';// 修改书籍信息

export default defineComponent({
    components:{
        AddOne, // 注册AddOne
        Update,
    },
    setup() {
        // 表格列的配置项
        const columns = [
            {
                title: '书名',
                dataIndex: 'name',
            },
            {
                title: '作者',
                dataIndex: 'author',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '库存',
                slots: {
                    customRender: 'count',
                },
            },
            {
                title: '出版日期',
                dataIndex: 'publishDate',
                // 插槽
                slots: {
                    customRender: 'publishDate',
                },
            },
            {
                title: '分类',
                dataIndex: 'classify',
            },
            {
                title: '操作',
                slots: {
                    customRender: 'actions',
                },
            },
            
        ];
        // 弹框显示
        const show = ref(false);// 添加一条弹框
        const showUpdateModal = ref(false);// 编辑书籍弹框
        // 书籍数据
        const list = ref([]);// 书籍数据
        const total = ref(0);// 总条数
        const curPage = ref(1);// 当前页
        const keyword = ref('');// 书名
        const isSearch = ref(false);// 当前搜索状态
        const curEditBook = ref({});// 编辑
        // 获取书籍信息
        const getList = async () => {
            const res = await book.list({
                page: curPage.value, // 页码
                size: 10,
                keyword: keyword.value,// 书名
            });
            // 成功时书籍列表以及页数赋值
            result(res)
                .success(({ data }) => {
                    const { list: l, total: t } = data;
                    list.value = l;
                    total.value = t;
                });
        };

        // 组件挂载时做的事情，页面显示时
        onMounted(async () => {
            getList();
        });
        // 页码变化时做的事情，获取对应页码的书籍数据
        const setPage = (page) => {
            curPage.value = page;

            getList();
        };
        // 搜索书籍
        const onSearch = () => {
            getList();
            // 字符串非空的时候 -> true
            // 字符串为空的时候 -> false
            isSearch.value = Boolean(keyword.value);// 搜索状态true/false
        };
        // 返回查询首页
        const backAll = () => {
            keyword.value = '';
            isSearch.value = false;// 搜索状态false
            getList();
        };
        // 删除一本书籍
        const remove = async ({ text:record }) => {
            const { _id } = record;

            const res = await book.remove(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                });
            
//            const idx = list.value.findIndex((item) => {
//                return item._id === _id;
//            });
//            list.value.splice(idx, 1);// 直接在页面删除

            getList();// 发送http刷新页面，获取最新数据
        };
        // 更新库存数据
        const updateCount = (type, record) => {
            // 增加或减少
            let word = '增加';
            if (type === 'OUT_COUNT') {
                word = '减少';
            }
            // 出入库弹框
            Modal.confirm({
                title: `要${word}多少库存`,
                content: (
                    <div>
                        <Input class="__book_input_count"/>
                    </div>
                ),
                // OK时做的事情
                onOk: async () => {
                    const el = document.querySelector('.__book_input_count');// 获取input数据
                    let num = el.value;// 取input值
                    // 请求
                    const res = await book.updateCount({
                        id: record._id,// 书名
                        num,// 量
                        type,// 出库或入库
                    });

                    result(res)
                        .success((data) => {
                            // 找到书
                            if (type === type) {
                                // 入库操作
                                num = Math.abs(num);
                            } else {
                                // 出库操作
                                num = -Math.abs(num);
                            }
                            // 在页面找这条item
                            const one = list.value.find((item) => {
                                return item._id === record._id;
                            });
                            // 修改数值
                            if (one) {
                                one.count = one.count + num;
                                // 出入库提示
                                message.success(`成功${word} ${Math.abs(num)} 本书`);
                            }
                        });
                    
                },
            });

        }; 
        // 传数据
        const update = ({ record }) => {
            showUpdateModal.value = true;
            curEditBook.value = record;
        };
        // 编辑books方法
        const updateCurBook = (newData) => {
            // 合并数据
            Object.assign(curEditBook.value, newData);
        };
        

        return {
            columns,// 表格列的配置项
            show,// 添加弹框开关
            list,// 数据
            formatTimestamp,// 格式化时间戳
            curPage,// 当前页数
            total,// 分页总数
            setPage,// 页码对应数据
            keyword,// 书名
            onSearch,// 查找书名
            backAll,// 返回查询首页
            isSearch,// 搜索状态
            remove,// 删除书籍
            updateCount,// 库存
            showUpdateModal,// 编辑模板
            update,
            curEditBook,// 编辑
            updateCurBook,// 编辑方法
        };
    },


});
import { defineComponent, ref, onMounted } from 'vue'; // ref：响应式变量，控制弹框的显示与隐藏；onMounted：组件被挂载时做的事情
import { book } from '@/service'; // http后端获取列表列表数据
import { useRouter } from 'vue-router'; // 操作路由的方法（跳到对应页面）
import { message, Modal, Input } from 'ant-design-vue'; // 提示框、确认框、输入框
import { result, formatTimestamp } from '@/helpers/utils'; // result请求结果；formatTimestamp格式化时间戳
import AddOne from './AddOne/index.vue'; // 书籍添加
import Update from './Update/index.vue'; // 修改书籍信息

export default defineComponent({
    components:{
        AddOne, // 注册AddOne
        Update, // 注册修改书籍
    },
    setup() {

        // 路由操作，跳转到指定详情页
        const router = useRouter();

        // 书籍表格列的配置项
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
        const show = ref(false); // 添加一条弹框，默认关闭
        const showUpdateModal = ref(false); // 修改书籍弹框
        // 书籍数据
        const list = ref([]); // 书籍数据
        const total = ref(0); // 书籍总数
        const curPage = ref(1); // 当前页码
        const keyword = ref(''); // 查询书名
        const isSearch = ref(false); // 当前搜索状态，默认false
        const curEditBook = ref({}); // 编辑

        // http后端返回书籍信息
        const getList = async () => {
            const res = await book.list({
                page: curPage.value, // 页码
                size: 10, // 书籍条数
                keyword: keyword.value, // 查找书名
            });
            
            // http成功时书籍列表以及页数赋值
            result(res)
                .success(({ data }) => {
                    // 重命名：l 书籍列表 ； t 书籍总数
                    const { list: l, total: t } = data;
                    list.value = l;
                    total.value = t;
                });
        };

        // 组件挂载时做的事情，页面打开时显示书籍list信息
        onMounted(async () => {
            getList(); // 返回书籍列表
        });

        // 页码变化时做的事情，获取对应页码的书籍数据
        const setPage = (page) => {
            curPage.value = page; // 修改当前页
            getList(); // 返回书籍列表
        };

        // 搜索书籍
        const onSearch = () => {
            getList(); // 显示书籍列表
            isSearch.value = Boolean(keyword.value); // 搜索状态（keyword.value有值时 true，无值 false）
        };

        // 返回书籍列表首页
        const backAll = () => {
            keyword.value = ''; // 清空查询书籍input
            isSearch.value = false; // 搜索状态false
            getList(); // 显示书籍列表
        };

        // 删除一本书籍
        const remove = async ({ text:record }) => {

            const { _id } = record; // 该书籍的一整条信息

            const res = await book.remove(_id); // http请求后端删除书籍

            // http成功提示
            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                });
            
//            const idx = list.value.findIndex((item) => {
//                return item._id === _id;
//            });
//            list.value.splice(idx, 1);// 直接在页面删除

            getList(); // http书籍列表
        };

        // 更新库存数据（增减，书籍记录）
        const updateCount = (type, record) => {

            // type：区分增加或减少
            let word = '增加';
            if (type === 'OUT_COUNT') {
                word = '减少';
            }

            // 出入库确认弹框
            Modal.confirm({
                title: `要${word}多少库存`,
                content: (
                    <div>
                        <Input class="__book_input_count"/>
                    </div>
                ),

                // OK时做的事情
                onOk: async () => {
                    const el = document.querySelector('.__book_input_count'); // 获取input数据
                    let num = el.value; // 增减数量

                    // http请求更新库存
                    const res = await book.updateCount({
                        id: record._id, // 书籍id
                        num, // 增减数量
                        type, // 出库或入库
                    });

                    // http成功响应
                    result(res)
                        .success((data) => {
                            // if是type入库
                            if (type === 'IN_COUNT') {
                                // 入库操作
                                num = Math.abs(num);
                            } else {
                                // 否则出库操作
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

        // 编辑事假
        const update = ({ record }) => {
            showUpdateModal.value = true; // 弹框
            curEditBook.value = record; // 书籍书籍
        };

        // 编辑books方法
        const updateCurBook = (newData) => {
            // 合并数据
            Object.assign(curEditBook.value, newData);
        };

        // 进入书籍详情页
        const toDetail = ({ record }) => {
            
            // 跳转到指定详情页
           router.push(`/books/${record._id}`);
        };
        

        return {
            columns, // 表格列的配置项
            show, // 添加书籍弹框开关
            list, // 后端书籍数据
            formatTimestamp, // 格式化时间戳
            curPage, // 当前页码
            total, // 书籍总数
            setPage, // 变换页面
            keyword, // 查询书名
            onSearch, // 查找书
            backAll, // 返回查询首页
            isSearch, // 当前搜索状态
            remove, // 删除书籍
            updateCount, // 更新库存
            showUpdateModal, // 修改书籍弹框
            update, // 修改书籍
            curEditBook, // 编辑
            updateCurBook, // 编辑方法
            toDetail, // 详情
        };
    },


});
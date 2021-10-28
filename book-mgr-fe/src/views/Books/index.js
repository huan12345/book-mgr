import {defineComponent} from 'vue' // 代码提示
export default defineComponent({
    setup() {
        // 表格列的配置项
        const columns = [
            {
                title: '名字',
                dataIndex: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
        ];
        // 表格行的数据
        const dataSource = [
            {
                name: '小红',
                age:2,
            }
        ];
        return {
            columns,// 表格列的配置项
            dataSource,// 表格行的数据
            
        };
    },
});
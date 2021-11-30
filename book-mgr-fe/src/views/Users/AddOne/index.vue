<template>
    <div>
       <!--  添加书籍弹框 -->
        <!-- :visible="props.show" 弹框默认不显示 -->
        <a-modal
            title="添加一个用户"
            :visible="props.show" 
            @ok="submit"
            @cancel="close"
        >
            <!-- 添加书籍弹框表单 -->
            <!-- label-col弹框标签占6，wrapper表单默认 -->
            <a-form :label-col="{ span: 6 }" >
                <!-- 表单项6个 -->
                <a-form-item label="账户">
                    <a-input v-model:value = "addForm.account" />
                </a-form-item>
                <a-form-item label="密码">
                    <a-input v-model:value = "addForm.password" /><!-- a-input-number 数字输入框 -->
                </a-form-item>
                
            </a-form>
        </a-modal>
    </div>
</template>

<script src="./index.js"></script>
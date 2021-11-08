<template>
    <div>
        <!-- :visible添加书籍弹框默认不显示 -->
        <a-modal
            title="添加书籍"
            :visible="props.show" 
            @ok="submit"
            @cancel="close"
        >
    <!-- label标签占6，wrapper表单默认 -->
            <a-form :label-col="{ span: 6 }" >
                <!-- 表单项6个 -->
                <a-form-item label="书名">
                    <a-input v-model:value = "addForm.name" />
                </a-form-item>
                <a-form-item label="价格">
                    <a-input-number v-model:value = "addForm.price" :min="0" :max="99999999" /><!-- 数字输入框 -->
                </a-form-item>
                <a-form-item label="作者">
                    <a-input v-model:value = "addForm.author" />
                </a-form-item>
                <a-form-item label="出版日期">
                    <a-date-picker v-model:value = "addForm.publishDate"  /><!-- 日期选择器 -->
                </a-form-item>
                <a-form-item label="分类">
                    <a-input v-model:value = "addForm.classify" />
                </a-form-item>
                <a-form-item label="库存">
                    <a-input v-model:value = "addForm.count" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script src="./index.js"></script>
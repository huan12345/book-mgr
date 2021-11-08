<!-- 图书管理页面 -->
<template>
    <div>
        <!-- 卡片样式 -->
        <a-card>
            <h2>图书列表</h2>
            <!-- 分割线 -->
            <a-divider />
            <!-- 两端对齐组件 -->
            <space-between>
                <div class="search">
                <a-input-search
                    placeholder="根据书名搜索"
                    enter-button 
                    v-model:value="keyword"
                    @search="onSearch"
                />
                <!-- 返回查询首页 -->
                <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
                </div>  
                <!-- 添加书籍按钮 -->
                <a-button @click="show = true">添加一条</a-button>   
            </space-between>

            <a-divider />
            <!-- 书籍表格信息 -->
            <a-table 
                :columns="columns" 
                :data-source="list"
                :pagination="false"
            >
                <!-- 出版时间格式化 -->
                <template #publishDate="data">
                    {{ formatTimestamp(data.record.publishDate) }}
                </template>
                <!-- 库存 -->
                <template #count="data">
                    <a href="javascript:;" @click="updateCount('IN_COUNT',data.record)">入库</a>
                    {{ data.record.count }}
                    <a href="javascript:;" @click="updateCount('OUT_COUNT',data.record)">出库</a>
                </template>
                <!-- 删除书籍 -->
                <template #actions="record">
                    <a href="javascript:;" @click="update(record)">编辑</a>
                    &nbsp;
                    <a href="javascript:;" @click="remove(record)">删除</a>
                </template>
            </a-table>
            <!-- 分页组件 -->
            <space-between style="margin-top: 23px">
                <div />
                <a-pagination 
                    v-model:current="curPage" 
                    :total="total"
                    :page-size="10" 
                    @change="setPage"
                />
            </space-between>
        </a-card>
        <!-- 添加一本书籍 -->
        <add-one 
            v-model:show="show"
        />
        <!-- 编辑书籍 -->
        <update 
            v-model:show="showUpdateModal"
            :book="curEditBook"
            @update="updateCurBook"
        />
    </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>// scoped 防止全局样式污染
    @import './index.scss';
</style>
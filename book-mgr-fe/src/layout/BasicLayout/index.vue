<template>
    <!-- 基础布局框架 --> 
    <div class="basic-layout">
        <!-- 上 --> 
        <div class="app-header">
            <!-- 上左 -->
            <div class="left">
                <img src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1" alt="">
                <div class="title">图书管理系统</div>
            </div>
            <!-- 上右 -->
            <div class="right">
                <div class="hello-msg">泥蠔，xx</div>
                <div class="logout">退出</div>
            </div>
        </div>
        <!-- 占位，解决app-header不占为覆盖app-content的问题 -->
        <div class="app-header-placeholder"></div>
        <!-- 下 --> 
        <div class="app-content">
            <!-- 下左 --> 
            <div class="left">
                <app-nav />
            </div>
            <!-- 下右 --> 
            <div class="right">
                <router-view /><!-- 路由容器，根据不同路由路径渲染不同东西 -->
            </div>
        </div>
    </div>
</template>
<!-- 基础布局逻辑 --> 
<script src="./index.js"></script>

<style lang="scss" scoped>
    @import './index.scss';
</style>
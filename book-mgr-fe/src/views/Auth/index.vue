<template>

    <!-- 认证 -->
    <div class="auth">
        <!-- 背景 -->
        <div class="bg"></div>
        <!-- 标题 -->
        <div class="title-info">
            <img src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1" alt="">
            <h2 class="title">图书管理系统后台</h2>
        </div>
        <!-- 认证表单 -->
        <div class="form">
            <a-tabs>
                <!-- 认证登入菜单1； key：切换；tab：标题-->
                <a-tab-pane key="1" tab="登录">

                    <div class="item">
                        <a-input
                            size="large"
                            placeholder="账户"
                            v-model:value="loginForm.account" 
                        >
                        <template
                         v-slot:prefix>       <!-- 前置插槽 -->
                            <UserOutlined /> <!-- 图标 -->
                         </template>
                        </a-input>
                    </div>

                    <div class="item">
                        <a-input
                            size="large"
                            placeholder="密码"
                            v-model:value="loginForm.password" 
                        >
                        <template
                         v-slot:prefix>       
                            <LockOutlined />   
                         </template>
                         </a-input>
                    </div>

                    <div class="item">
                        <a href="">忘记密码</a>
                    </div>

                    <div class="item">
                        <a-button
                            size="large"
                            type="primary"
                            @click="login" 
                        >
                            登入
                        </a-button>
                    </div>
                </a-tab-pane>

                <!-- 认证注册菜单2 -->
                <a-tab-pane key="2" tab="注册">
                    <!-- 账户 -->
                    <div class="item">
                        <a-input 
                            size="large" 
                            placeholder="账户"
                            v-model:value="regForm.account"
                        >
                         <template
                         v-slot:prefix>      <!-- 前置插槽 -->
                            <UserOutlined /> <!-- 图标icon -->
                         </template>
                         </a-input>
                    </div>
                    <!-- 密码 -->
                    <div class="item">
                        <a-input
                            size="large"
                            placeholder="密码"
                            v-model:value="regForm.password"
                        >
                        <template
                         v-slot:prefix>      <!-- 前置插槽 -->  
                            <LockOutlined /> <!-- 图标icon -->   
                        </template>
                        </a-input>
                    </div>
                    <!-- 邀请码 -->
                    <div class="item">
                        <a-input
                            size="large"
                            placeholder="邀请码"
                            v-model:value="regForm.inviteCode"
                        >
                        <template
                            v-slot:prefix
                        ><!-- 前置插槽 -->
                            <!-- 图标icon -->
                            <MailOutlined />   
                        </template>
                        </a-input>
                    </div>

                    <div class="item">
                        <!-- 触发注册逻辑 -->
                        <a-button
                            @click="register"
                            size="large"
                            type="primary"
                        >
                            注册
                        </a-button>
                    </div>

                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<!-- 逻辑 -->
<script src="./index.js"></script>

<!-- 样式 -->
<style lang="scss" scpoed>
    @import './index.scss';
</style>
<!-- 组件 -->
<template>
    <!-- 两端对其 -->
    <div class="space-between">
        <!-- 插槽 -->
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .space-between {
        display: flex;// 弹性布局
        justify-content: space-between;// 元素两端对齐
    }
</style>
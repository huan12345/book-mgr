<!-- 组件 -->
<template>
    <!-- 两端对其 -->
    <div class="flex-end">
        <!-- 插槽 -->
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .flex-end {
        display: flex; // 弹性布局
        justify-content: flex-end; // 元素两端对齐
    }
</style>
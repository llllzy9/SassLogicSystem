<template>
    <div class="head-wrap">
        <div class="avatar">
            <a-dropdown>
            <Avatar />
            <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;">个人中心</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">设置</a>
        </a-menu-item>
        <a-menu-item>
          <RouterLink to="/">退出登录</RouterLink>
        </a-menu-item>
      </a-menu>
    </template>
        </a-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Avatar from './Avatar/index.vue'
</script>

<style lang="scss" scoped>
.head-wrap{
    position: relative;
    width: 100%;
    .avatar{
        position: absolute;
        right: 20px;
    }
}
</style>
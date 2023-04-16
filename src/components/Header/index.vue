<template>
  <div class="head-wrap">
    <div class="menu">
      <a-menu mode="horizontal" v-if="route.path.includes('actManage')">
        <a-menu-item key="base" @click="routeGoto('/container/actManage/basicInfo')">
          基本资料
        </a-menu-item>
        <a-menu-item key="pass" @click="routeGoto('/container/actManage/passManage')">
          密码管理
        </a-menu-item>
      </a-menu>
      <!-- <a-menu mode="horizontal" v-if="route.path.includes('jobInfo')">
        <a-menu-item key="base" @click="routeGoto('')">
          全部
        </a-menu-item>
        <a-menu-item key="pass" @click="routeGoto('')">
          未完成
        </a-menu-item>
        <a-menu-item key="pass" @click="routeGoto('')">
          已完成
        </a-menu-item>
      </a-menu> -->
    </div>
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
import { useRoute,useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

console.log(route.path);

const routeGoto = (url:string) => {
  router.push({
    path:url
  })
}



</script>

<style lang="scss" scoped>
.head-wrap {
  position: relative;
  width: 100%;

  .avatar {
    position: absolute;
    right: 20px;
  }
}
</style>
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
    </div>
    <div class="avatar">
      <Avatar />
      <a-dropdown>
        <span>
          {{ userStore.userInfo.nickname }}
          <DownOutlined />
        </span>
        <template #overlay>
          <a-menu>
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
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
import { DownOutlined } from '@ant-design/icons-vue';
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const routeGoto = (url: string) => {
  router.push({
    path: url
  })
}



</script>

<style lang="scss" scoped>
.head-wrap {
  position: relative;
  width: 100%;

  .avatar {
    
    width: 100px;
    position: absolute;
    top: 0px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    span {
      color: #595959;
      font-weight: 500;
    }
  }
}
</style>
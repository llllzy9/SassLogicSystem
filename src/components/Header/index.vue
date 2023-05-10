<template>
  <div class="head-wrap">
    <div class="menu">
      <a-menu mode="horizontal" v-if="route.path.includes('actManage')">
        <a-menu-item key="base" @click="routeGoto('basicInfo')">
          基本资料
        </a-menu-item>
        <a-menu-item key="pass" @click="routeGoto('passManage')">
          密码管理
        </a-menu-item>
      </a-menu>
      <a-menu mode="horizontal" v-if="route.path.includes('courseDetail')">
        <a-menu-item key="base" @click="routeGoto('homeWork')">
          我的作业
        </a-menu-item>

        <a-menu-item key="pass" @click="routeGoto('myInformation')">
          <!-- <a-badge :count="courseStore.inforNum()"> -->
          我的信息
          <!-- </a-badge> -->
        </a-menu-item>

      </a-menu>
    </div>
    <div class="avatar">
      <Avatar />
      <a-dropdown>
        <span>
          {{ nickname }}
        </span>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a @click="logoutExit">退出登录</a>
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
import { useCourseStore } from '@/stores/course';
import { ref } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue';
import { logout } from '@/network/login'
import { message } from 'ant-design-vue';
import { getUserInfo } from '@/network/user.js'

const nickname = ref('')
getUserInfo()
  .then((res: any) => {
    if (res.data.code === 200) {
      nickname.value = res.data.data.nickname
    }
  })
  .catch((err: any) => console.log(err))
const userStore = useUserStore()
const courseStore = useCourseStore()
const route = useRoute()
const router = useRouter()

const routeGoto = (name: string) => {
  router.push({
    name: name
  })
}

function logoutExit() {
  logout()
    .then((res: any) => {
      if (res.data.code === 200) {
        message.success('退出成功')
        sessionStorage.clear()
        router.push({
          path: '/'
        })
      }
    })
}
</script>

<style lang="scss" scoped>
.head-wrap {
  position: relative;
  width: 100%;
  height: 100%;

  .avatar {
    width: 130px;
    height: 100%;
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

::v-deep .ant-badge-count,
.ant-badge-dot,
.ant-badge .ant-scroll-number-custom-component {
  transform: translate(88%, -80%);
}
</style>
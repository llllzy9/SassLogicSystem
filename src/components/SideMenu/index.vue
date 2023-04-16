<template>
  <a-menu 
  theme="dark" 
  mode="inline"
  :selectedKeys="[route.path]"
  >
    <a-menu-item key="/home" @click="routeGoto('/container/home')">
        <HomeOutlined />
        <span>主页</span>
    </a-menu-item>
    <a-menu-item key="/actManage" @click="routeGoto('/container/actManage')">
        <TeamOutlined />
        <span>账号管理</span>
    </a-menu-item>
    <a-menu-item key="/labCourse" @click="routeGoto('/container/labCourse')">
        <ClusterOutlined />
        <span>实验课程</span>
    </a-menu-item>
    <a-menu-item key="/jobInfo" @click="routeGoto('/container/jobInfo')">
        <EditOutlined />
        <span>作业信息</span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import {
  HomeOutlined,
  EditOutlined,
  TeamOutlined,
  ClusterOutlined,
} from '@ant-design/icons-vue';
import { reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router';
const router = useRouter()

const routeGoto = (url:string) => {
  router.push({
    path:url
  })
}

const route = useRoute()


</script>

<style lang="scss" scoped></style>
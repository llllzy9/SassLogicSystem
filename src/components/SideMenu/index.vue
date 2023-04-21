<template>
  <a-menu 
  theme="dark" 
  mode="inline"
  :selectedKeys="[route.path]"
  >
    <a-menu-item key="/home" @click="routeGoto('home')">
        <HomeOutlined />
        <span>主页</span>
    </a-menu-item>
    <a-menu-item key="/actManage" @click="routeGoto('actManage')">
        <TeamOutlined />
        <span>账号管理</span>
    </a-menu-item>
    <a-menu-item key="/labCourse" @click="routeGoto('labCourse')">
        <ClusterOutlined />
        <span>实验课程</span>
    </a-menu-item>
    <a-menu-item key="/jobInfo" @click="routeGoto('jobInfo')">
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

const routeGoto = (path:string) => {
  router.push({
    name:path
  })
}

const route = useRoute()


</script>

<style lang="scss" scoped></style>
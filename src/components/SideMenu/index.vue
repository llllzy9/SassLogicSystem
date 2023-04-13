<template>
  <a-menu 
  theme="dark" 
  mode="inline"
  :selectedKeys="[route.path]"
  >
    <a-menu-item key="/home">
      <router-link to="home">
        
        <HomeOutlined />
        <span>主页</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="/actManage">
      <router-link to="actManage">
        <TeamOutlined />
        <span>账号管理</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="/labCourse">
      <router-link to="labCourse">
        <ClusterOutlined />
        <span>实验课程</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="/jobInfo">
      <router-link to="jobInfo">
        <EditOutlined />
        <span>作业信息</span>
      </router-link>
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
import { useRoute } from 'vue-router';

const route = useRoute()


</script>

<style lang="scss" scoped></style>
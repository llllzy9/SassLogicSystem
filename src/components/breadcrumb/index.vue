<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
      <router-link v-if="item.name != name && index != 1" :to="{ path: item.path === '' ? '/' : item.path }">{{
        item.meta.title }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';

import { useRoute } from 'vue-router';
const route = useRoute()

interface Route{
  name:string
  path:string
  meta:{
    title:string
  }
}

const name = ref()
const breadList = ref<Route[]>([
])
function getBreadcrumb() {
  breadList.value = []
  name.value = route.name
  route.matched.forEach((item: any) => {
    breadList.value.push(item)
  })
}
getBreadcrumb()


watch(
  route, () => {
    getBreadcrumb()
  })

watch(breadList.value, (newValue) => {
  if (newValue.length === 0) {
    breadList.value = [
      {
        name: '主页',
        path: '/home',
        meta: {
          title: '首页'
        }
      }
    ]
  }
})
</script>
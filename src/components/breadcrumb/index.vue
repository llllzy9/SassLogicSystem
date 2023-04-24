<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
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

const name = ref('')
const breadList = ref([''])
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
</script>
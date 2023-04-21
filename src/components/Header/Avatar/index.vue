<template>
  <a-avatar :size="50" :src="userStore.avatarImg()">
  </a-avatar>
</template>
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
console.log(userStore.avatarImg());
</script>
  
  
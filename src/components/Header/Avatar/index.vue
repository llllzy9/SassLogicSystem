<template>
  <a-avatar size="large" :src="userStore.avatarImg()">
  </a-avatar>
</template>
<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import { ref,onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
const imgSrc = ref('')
console.log(userStore.avatarImg());

// onMounted(() => {
//   console.log(userStore.userInfo);
  
//   imgSrc.value = 'http://154.204.60.38:8000/img/user/admin/' + userStore.userInfo.avatar
  
// console.log(imgSrc.value);
// })





</script>
  
  
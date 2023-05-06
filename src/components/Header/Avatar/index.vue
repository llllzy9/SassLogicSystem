<template>
  <a-avatar :size="50" :src="userStore.avatarImg(avatar)">
  </a-avatar>
</template>
<script setup lang="ts">
import { getUserInfo } from '@/network/user.js'
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
console.log(userStore.avatarImg());
console.log(userStore.userInfo)
const avatar = ref()
getUserInfo()
  .then((res: any) => {
    if (res.data.code === 200) {
        avatar.value = res.data.data.avatar        
    }
  })
  .catch((err: any) => console.log(err))

</script>
  
  
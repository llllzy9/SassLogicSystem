<template>
    <a-result status="404" title="404" sub-title="抱歉，没有找到该页面">
        <template #extra>
            <a-button type="primary" @click="goHome">回到首页</a-button>
        </template>
    </a-result>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
 function goHome(){
    router.push({name:'home'})
 }
</script>
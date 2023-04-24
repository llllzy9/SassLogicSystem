<template>
    
</template>

<script lang="ts" setup>
import { useRouter,useRoute } from 'vue-router';
const route = useRoute()
const router = useRouter()
console.log(route.query);

</script>
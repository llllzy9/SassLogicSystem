<template>
    <div >
        <stuVidw v-if="!userStore.isTeacher" />
        <terView v-else />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import stuVidw from './studentView/index.vue'
import terView from './teacherView/index.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()



</script>

<style lang="scss" scoped></style>
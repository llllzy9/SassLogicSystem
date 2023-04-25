<template>
    <RouterView :data="data" />
</template>

<script lang="ts" setup>
import { getHomework, getMessage } from '@/network/course.js'
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useCourseStore } from '@/stores/course';
const route = useRoute()
const courseStore = useCourseStore()
console.log(route.query);

const data = reactive({
    homeWorkList: [],
    infoList: [],
    loading:true
})
const params = ref({
    courseId: route.query.id
})
getHomework(params.value)
    .then((res: any) => {
        if (res.data.code === 200) {
            data.loading = false
            data.homeWorkList = res.data.data
        } else {
            return Promise.reject(res.data.msg)
        }
    }).catch((err: any) => {
        console.log(err)
    })
getMessage()
    .then((res: any) => {
        if (res.data.code === 200) {
            data.infoList = res.data.data
            courseStore.informationList = res.data.data
            console.log(courseStore.informationList,'courseStore.informationList');
            
        } else {
            return Promise.reject(res.data.msg)
        }
    }).catch((err: any) => {
        console.log(err)
    })
</script>
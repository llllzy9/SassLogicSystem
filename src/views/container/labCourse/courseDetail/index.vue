<template>
    <RouterView :data="data" />
</template>

<script lang="ts" setup>
import { getHomework, stdGetMessage,getDistributeHomework,tecGetMessage } from '@/network/course.js'
import { ref, reactive,inject } from 'vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { useCourseStore } from '@/stores/course';
const roles = inject('roles')
const route = useRoute()
const courseStore = useCourseStore()

//数据请求
// async function getData() {
//     try {
//         const getDataList = roles == 2 ? [getDistributeHomework,tecGetMessage] : [getHomework,stdGetMessage]
//         Promise.allSettled(getDataList)
//         const respose = await getDataList()
//         if (respose.data.code === 200) {
//             data.homeWorkList = respose.data.data
//             message.success('获取成功')
//         } else {
//             message.error('服务繁忙')
//             throw new Error(respose.data.msg)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

const data = reactive({
    homeWorkList: [],
    infoList: [],
    loading:true
})
const params = ref({
    courseId: route.query.id
})
// getHomework(params.value)
//     .then((res: any) => {
//         if (res.data.code === 200) {
//             data.loading = false
//             data.homeWorkList = res.data.data
//         } else {
//             return Promise.reject(res.data.msg)
//         }
//     }).catch((err: any) => {
//         console.log(err)
//     })
// getMessage()
//     .then((res: any) => {
//         if (res.data.code === 200) {
//             data.infoList = res.data.data
//             courseStore.informationList = res.data.data
//             console.log(courseStore.informationList,'courseStore.informationList');
            
//         } else {
//             return Promise.reject(res.data.msg)
//         }
//     }).catch((err: any) => {
//         console.log(err)
//     })
</script>
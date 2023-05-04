<template>
    <div v-for="(card,index) in dataList" :key="index" class="list-container">
        <a-card hoverable style="width: 300px">
            <template #cover>
                <img alt="example" style="object-fit:cover;height: 250px;" :src="courseStore.courseImg(card.avatar)">
            </template>
            <template class="ant-card-actions" #actions>
                <a @click="openModal('exam',card,index,)">进入实验</a>
                <!-- <a-badge :dot="courseStore.inforNum()>0"> -->
                <a @click="openModal('detail',card,index,)">查看详情</a>
                <!-- </a-badge> -->
            </template>
            <a-card-meta :title="card.courseName">
                <template #description>
                    <p>实验操作平台：{{ card.experimentalPlatform }}</p>
                    <p>任课老师：{{card.nickname}}</p>
                    <p>开课时间：{{card.startTime}}</p>
                    <p>参加班级：{{card.class}}</p>
                </template>
            </a-card-meta>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import {useCourseStore} from '@/stores/course.ts'
import { useRouter } from 'vue-router';
const router = useRouter()
const courseStore = useCourseStore()

interface Info{
    avatar:string
    course:string
    experimentalPlatform:string
    nickname:string
    startTime:string
    class:string
}
interface Props{
    dataList?:Info[]
}
const props = withDefaults(defineProps<Props>(), {
    dataList:() => [],
})

//打开弹窗
function openModal(str: string, obj?: any, i?: number,) {
    console.log(1);
    
    if (str === 'exam') {
        window.open('https://www.baidu.com', '_blank');
    } else if (str === 'detail') {
        router.push({
            name: 'courseDetail',
            query: obj
        })
    }
}
</script>
<style lang="scss" scoped>
</style>

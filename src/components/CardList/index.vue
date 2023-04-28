<template>
    <div v-for="(card,index) in dataList" :key="index" class="list-container">
        <a-card hoverable style="width: 300px">
            <template #cover>
                <img alt="example" style="object-fit:cover;height: 250px;" :src="courseStore.courseImg(card.avatar)">
            </template>
            <template class="ant-card-actions" #actions>
                <span @click="openModal('exam',card,index,)">进入实验</span>
                <a-badge :dot="courseStore.inforNum()>0">
                <a @click="openModal('detail',card,index,)">查看详情</a>
                </a-badge>
            </template>
            <a-card-meta :title="card.course">
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
    openModal?:(str:string,obj:any,i:number,)=> void
}
const props = withDefaults(defineProps<Props>(), {
    dataList:() => [],
    openModal:(i,str) => {
        console.log(i,str);
    }
    
})
</script>
<style lang="scss" scoped>
</style>

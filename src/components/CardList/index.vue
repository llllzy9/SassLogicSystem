<template>
    <div v-for="(card,index) in dataList" :key="index" class="list-container">
        <a-card hoverable style="width: 300px">
            <template #cover>
                <img alt="example" :src="userStore.courseImg(card.avatar)">
            </template>
            <template class="ant-card-actions" #actions>
                <span @click="openModal(card,index,'exam')">进入实验</span>
                <span @click="openModal(card,index,'detail')">查看详情</span>
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
import {useUserStore} from '@/stores/user.ts'
const userStore = useUserStore()

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
    openModal?:(obj:any,i:number,str:string)=> void
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

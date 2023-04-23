<template>
    <div v-for="(card,index) in dataList" :key="index" class="list-container">
        <a-card hoverable style="width: 300px">
            <template #cover>
                <img alt="example" :src="card.image">
            </template>
            <template class="ant-card-actions" #actions>
                <span @click="openModal(card,index,'detail')">查看详情</span>
                <span @click="openModal(card,index,'exam')">进入实验</span>
            </template>
            <a-card-meta :title="card.title">
                <template #description>
                    <p>任课老师：{{card.teacher}}</p>
                    <p>开课时间：{{card.startTime}}</p>
                    <p>参加班级：{{card.class}}</p>
                </template>
            </a-card-meta>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { getAllCourse } from '../../network/course';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';


interface Info{
    image:string
    title:string
    teacher:string
    startTime:string
    class:string
}
interface Props{
    dataList?:Info[]
    openModal?:(obj:any,i:number,str:string)=> void
}
const props = withDefaults(defineProps<Props>(), {
    dataList:() => [
        {
            image:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title:'数字逻辑',
            teacher:'溪利亚',
            startTime:'2022-01-22',
            class:'计算机科学与技术'
        }
    ],
    openModal:(i,str) => {
        console.log(i,str);
    }
    
})
</script>
<style lang="scss" scoped>
</style>

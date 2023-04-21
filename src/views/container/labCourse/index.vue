<template>
    <div class="container">
        <div class="content">
            <CardList :dataList="state.dataList" :openModal="openModal"/>
        </div>
        <div class="popUps">
            <a-modal v-model:visible="visible" width="1000px" title="Basic Modal" @ok="handleOk">
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </a-modal>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CardList from '@/components/CardList/index.vue'
import { getAllCourse } from '@/network/course.js'
import { ref, reactive } from 'vue';
getAllCourse()
    .then((res: any) => {
        console.log(res.data);
    })

const state = reactive({
    dataList:[
    {
            image:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title:'数字逻辑',
            teacher:'溪利亚',
            startTime:'2022-01-22',
            class:'计算机科学与1技术'
        },
        {
            image:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title:'数字逻辑',
            teacher:'溪利亚',
            startTime:'2022-01-22',
            class:'计算机科学与技术'
        },
        {
            image:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title:'数字逻辑',
            teacher:'溪利亚',
            startTime:'2022-01-22',
            class:'计算机科学与1技术'
        },
        {
            image:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title:'数字逻辑',
            teacher:'溪利亚',
            startTime:'2022-01-22',
            class:'计算机科学与技术'
        },
        {
            image:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title:'数字逻辑',
            teacher:'溪利亚',
            startTime:'2022-01-22',
            class:'计算机科学与1技术'
        },
        {
            image:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title:'数字逻辑',
            teacher:'溪利亚',
            startTime:'2022-01-22',
            class:'计算机科学与技术'
        },
    ]
})

const visible = ref<boolean>(false)
function openModal(i:number,str:string) {
    console.log(i,str);
    visible.value = true
}

</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;

    .form-wrap {
        height: 50px;
        margin-bottom: 20px;
    }

    .content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        row-gap: 30px;
    }
}
</style>
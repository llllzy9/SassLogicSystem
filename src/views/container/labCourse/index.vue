<template>
    <div class="container">
        <div class="content">
            <CardList :dataList="state.dataList" :openModal="openModal"/>
        </div>
        <div class="popUps">
            <a-modal v-model:visible="visible" width="1000px" @ok="handleOk">
                <template #title>
                    <div :style="{
                        display:'flex',
                        alignItems:'baseline',
                        gap:'30px',
                        fontSize:'14px'
                    }">
                    <h2>{{ '数字逻辑' }}</h2>
                    <span>任课老师：{{ '溪利亚' }}</span>
                    <span>班级：{{ '计算机科学与技术' }}</span>
                    <span>开课时间：{{ '2023-01-22' }}</span>
                    </div>
                </template>
                <myTable :dataSource="state.dataSource" :columns="state.columns"></myTable>
            </a-modal>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CardList from '@/components/CardList/index.vue'
import myTable from '@/components/Table/index.vue'
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
    ],
    dataSource:[
    {
      key: '1',
      name: '第一章上机作业',
      createTime: '2023-01-22',
      tags: ['未完成'],
    },
  ],
  columns:[
    {
      title:'名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '状态',
      dataIndex: 'tags',
      slots: { customRender: 'tags' },
    },
    {
      title: '操作',
      dataIndex:'action',
      slots: { customRender: 'action' },
    },
  ]
})

const visible = ref<boolean>(false)
function openModal(i:number,str:string) {
    console.log(i,str);
    visible.value = true
}

const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };

</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    /* align-items: baseline; */

    .form-wrap {
        height: 50px;
        margin-bottom: 20px;
    }

    .content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        row-gap: 30px;
    }
    .popUps{

    }
}
</style>
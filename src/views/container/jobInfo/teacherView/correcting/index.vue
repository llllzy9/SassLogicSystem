<template>
     <a-select
      ref="select"
      v-model:value="selctValue"
      style="width: 120px"
      @change="handleChange"
    >
      <a-select-option value="1">计科1907</a-select-option>
      <a-select-option value="2">计科2002</a-select-option>
    </a-select>
    <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全部">
            <myTable :columns="columns" :data-source="state.allHomeWork" >
            </myTable>
        </a-tab-pane>
        <a-tab-pane key="2" tab="已批改" force-render>
            <myTable :columns="columns" :data-source="state.doneHomeWork" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="未批改">
            <myTable :columns="columns" :data-source="state.noneHomeWork" />
        </a-tab-pane>
    </a-tabs>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import myTable from '@/components/Table/index.vue'
import { useRouter } from 'vue-router';
import { getHomework } from '@/network/course.js';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()
const activeKey = ref('1')
const selectValue = ref()
const columns = [
    {
        title: '课程',
        dataIndex: 'course',
    },
    {
        title: '名称',
        dataIndex: 'title',
    },
    {
        title: '分数',
        dataIndex: 'score',
        text:true
    },
    {
        title: '完成时间',
        dataIndex: 'startTime',
        align:'center',
        time:true,
    },
    {
        title: '状态',
        dataIndex: 'completionStatus',
        tags:true
    },
    {
        title: '内容描述',
        dataIndex: 'content'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        align:'center',
        btns:[
            {
                label:'批改',
                type:'primary',
                func:(obj:any) => handleCorrecting(obj)
            },
            {
                label:'删除',
                func:(obj:any) => handleDelete(obj)
            }
        ]
        
    }
]
const state = reactive({
    allHomeWork: [{}],
    doneHomeWork: [],
    noneHomeWork: [],
    fullPopUps: {
        title: '',
        score: '',
        startTime: '',
        endTime: '',
        content: ''
    }
})
function handleCorrecting(obj:any){
    console.log(obj);
}

function handleDelete(obj:any){
    console.log(obj);
    
}
const selctValue = ref()
function handleChange() {

}
</script>
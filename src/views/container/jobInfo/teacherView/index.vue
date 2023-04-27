<template>
     <a-select
      ref="select"
      v-model:value="selectValue"
      style="width: 120px"
      @change="handleSelChange"
    >
      <a-select-option value="数字逻辑">数字逻辑</a-select-option>
      <a-select-option value="计算机网络" disabled>计算机网络</a-select-option>
    </a-select>
   <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全部">
            <myTable :columns="columns" :data-source="state.allHomeWork" :handle-view="handleView" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="已截至" force-render>
            <myTable :columns="columns" :data-source="state.doneHomeWork" :handle-view="handleView" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="未截至">
            <myTable :columns="columns" :data-source="state.noneHomeWork" :handle-view="handleView" />
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
        time:true
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
        btns:[
            {
                label:'查看',
                func:(obj:any) => handleView(obj)
            }
        ]
        
    }
]
const state = reactive({
    allHomeWork: [
    {
        course:'1',
        title: '1',
        score: 'John Brown',
        startTime: 32,
        completionStatus:true,
        endTime: 'New York No. 1 Lake Park',
        content: 'nicedeveloper',
        address:'1'
    },
    ],
    doneHomeWork: [],
    noneHomeWork: [],
    fullPopUps: {
        title: '1',
        score: '1',
        startTime: '2',
        endTime: '3',
        content: '1'
    }
})
function handleSelChange(val:string){
    console.log(val);
}
function handleView(obj:any){
    router.push({
        name:'correcting'
    })
    console.log(obj);
}

</script>
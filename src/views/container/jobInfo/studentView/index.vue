<template>
    <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全部">
            <myTable :columns="columns" :data-source="state.allHomeWork" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="已完成" force-render>
            <myTable :columns="columns" :data-source="state.doneHomeWork" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="未完成">
            <myTable :columns="columns" :data-source="state.noneHomeWork" />
        </a-tab-pane>
    </a-tabs>

    <div class="full-popUps-student">
        <DoHomework :fullPopUps="state.fullPopUps" ref="popRef" @refresh="getData" />
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, inject } from 'vue';
import myTable from '@/components/Table/index.vue'
import { getHomework, getSubmitHomework } from '@/network/homework.js';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user'
import DoHomework from '@/components/DoHomework/index.vue'
const userStore = useUserStore()
const roles = inject('roles')
function getData() {
    return new Promise((reslove, reject) => {
        console.log('获取学生数据')
        getHomework()
            .then((res: any) => {
                if (res.data.code === 200) {
                    reslove(res.data.data)
                } else reject(res.data.msg)
            })
    })
}
getData()
    .then((res: any) => {
        message.success('获取成功')
        state.allHomeWork = res
        dataClassification(res)
    })
    .catch((err: any) => {
        message.error('没有数据')
    })

const columns = [
    {
        title: '名称',
        dataIndex: 'title',
    },
    {
        title: '分数',
        dataIndex: 'score',
    },
    {
        title: '完成时间',
        dataIndex: 'startTime',
        align: 'center',
    },
    {
        title: '状态',
        dataIndex: 'completionStatus',
        tags: {
                done:true,
                deadline:true
            },
    },
    {
        title: '内容描述',
        dataIndex: 'content'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        btns: [
            {
                label: '开始',
                func: (obj: any) => openFullModal(obj),
                display: roles !== 2,
                type: 'primary'
            },
        ]
    }
]
const activeKey = ref('1')
const state = reactive({
    allHomeWork: [],
    doneHomeWork: [],
    noneHomeWork: [],
    fullPopUps: {
        id:'',
        title:'',
        score:'',
        startTime:'',
        endTime:'',
        content:'',
    },
})
const popRef = ref()
function openFullModal(obj: any) {
    state.fullPopUps = obj
    popRef.value.openFullModal(obj.id)
}

function dataClassification(array: any) {
    array.filter((item: any) => {
        if (item.completionStatus) {
            state.doneHomeWork.push(item)
        } else {
            state.noneHomeWork.push(item)
        }
    })
}
</script>
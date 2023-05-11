<template>
    <a-form-item label="课程">
        <a-select ref="select" v-model:value="selectValue" style="width: 120px" @change="handleSelChange">
            <a-select-option value="全部">全部</a-select-option>
            <a-select-option value="数字逻辑">数字逻辑</a-select-option>
            <a-select-option value="计算机网络" disabled>计算机网络</a-select-option>
        </a-select>
    </a-form-item>
    <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全部">
            <myTable :columns="columns" :data-source="state.allHomeWork" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="已过期" force-render>
            <myTable :columns="columns" :data-source="state.overdueHomework" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="未过期">
            <myTable :columns="columns" :data-source="state.takeEffectHomework" />
        </a-tab-pane>
    </a-tabs>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import myTable from '@/components/Table/index.vue'
import { useRouter } from 'vue-router';
import { getDistributeHomework } from '@/network/homework'
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user'
import { deadlineTime, dataClassification } from '@/hooks/fication'
const userStore = useUserStore()
const router = useRouter()
const activeKey = ref('1')
const selectValue = ref('全部')
const columns = [
    {
        title: '标题',
        dataIndex: 'title',
    },
    {
        title: '完成时间',
        dataIndex: 'startTime',
        time: true
    },
    {
        title: '状态',
        dataIndex: 'completionStatus',
        tags: {
            done: false,
            deadline: true
        }
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
                label: '查看',
                func: (obj: any) => handleView(obj),
                display: userStore.isTeacher,
                type: 'primary'
            }
        ]

    }
]
interface State{
    allHomeWork:any[]
    overdueHomework:any[]
    takeEffectHomework:any[]
}
const state = reactive<State>({
    allHomeWork: [

    ],
    overdueHomework: [],
    takeEffectHomework: []
})
function getData() {
    getDistributeHomework()
        .then((res: any) => {
            if (res.data.code === 200) {
                message.success('获取成功')
                state.allHomeWork = res.data.data
                state.overdueHomework = dataClassification(res.data.data, 'date', 'endTime').trueArray
                state.takeEffectHomework = dataClassification(res.data.data, 'date', 'endTime').falseArray
            }
        })
}
getData()

function handleSelChange(val: string) {
    console.log(val);
}
function handleView(obj: any) {
    router.push({
        name: 'correcting',
        query:obj
    })
    console.log(obj);
}

</script>
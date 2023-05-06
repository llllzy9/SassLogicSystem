<template>
    <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全部">
            <myTable :columns="columns" :openFullModal="openFullModal" :data-source="state.allHomeWork" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="已完成" force-render>
            <myTable :columns="columns" :data-source="state.doneHomeWork" :openFullModal="openFullModal" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="未完成">
            <myTable :columns="columns" :data-source="state.noneHomeWork" :openFullModal="openFullModal" />
        </a-tab-pane>
    </a-tabs>

    <div class="full-popUps-student">
        <a-modal v-model:visible="fullVisible" :title="state.fullPopUps.title" width="100%" wrapClassName="full-modal">
            <div class="top-info" style="display: flex;flex-direction: column;align-items: center;justify-content: space-around;height: 10%;border-bottom: 2px dashed #eee;font-size: 18px;">
                <a-row>
                    <a-col :span="2"><span>满分：{{ state.fullPopUps.score }}</span></a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <p>作答时间：{{ state.fullPopUps.startTime }} ~ {{ state.fullPopUps.endTime }}</p>
                    </a-col>
                </a-row>
            </div>
            <div class="topic-content"></div>
            <template #footer>
                <a-button type="primary" value="large" @click="gotoExam">进入实验</a-button>
                <a-button value="large">上传提交</a-button>
            </template>
        </a-modal>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import myTable from '@/components/Table/index.vue'
import { getHomework } from '@/network/homework.js';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

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
        slots: { customRender: 'text' }
    },
    {
        title: '完成时间',
        dataIndex: 'startTime',
        align: 'center',
        slots: { customRender: 'time' }
    },
    {
        title: '状态',
        dataIndex: 'completionStatus',
        slots: { customRender: 'tags' }
    },
    {
        title: '内容描述',
        dataIndex: 'content'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
    }
]
const activeKey = ref('1')
const state = reactive({
    allHomeWork: [{}],
    doneHomeWork: [{}],
    noneHomeWork: [{}],
    fullPopUps: {
        title: '',
        score: '',
        startTime: '',
        endTime: '',
        content: ''
    }
})

const fullVisible = ref<boolean>(false)
function openFullModal(obj: any) {
    state.fullPopUps = obj
    fullVisible.value = true
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

function gotoExam() {
    window.open('http://106.14.20.78:8080/szljTest', '_brank')
}
</script>
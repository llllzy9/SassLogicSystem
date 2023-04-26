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
    <div class="full-popUps">
        <a-modal v-model:visible="fullVisible" :title="state.fullPopUps.title" width="100%" wrapClassName="full-modal">
            <div class="top-info" :style="{ ...fullPopStyle }">
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

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { getHomework } from '@/network/course.js'
import { message } from 'ant-design-vue';
import myTable from '@/components/Table/index.vue'

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
        align:'center',
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
const fullPopStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    justifyContent: 'space-around',
    height: '10%',
    borderBottom: '2px dashed #eee',
    fontSize: '18px'
}
const state = reactive({
    allHomeWork: [],
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
const loading = ref(true)
getHomework()
    .then((res: any) => {
        console.log(res.data);
        if (res.data.code === 200) {
            message.success('获取成功')
            state.allHomeWork = res.data.data
            dataClassification(res.data.data)
            loading.value = false
        }
    })
const activeKey = ref('1')

const fullVisible = ref<boolean>(false)
function openFullModal(obj: any) {
    state.fullPopUps = obj
    fullVisible.value = true
}

function gotoExam() {
    window.open('http://106.14.20.78:8080/szljTest', '_brank')
}

function dataClassification(array: any) {
    array.filter((item: any) => {
        if(item.completionStatus){
            state.doneHomeWork.push(item)
        }else{
            state.noneHomeWork.push(item)
        }
    })
}
</script>

<style lang="scss" scoped></style>
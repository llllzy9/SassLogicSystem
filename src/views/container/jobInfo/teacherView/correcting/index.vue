<template>
    <a-form-item label="班级">
        <a-select ref="select" v-model:value="selectValue" style="width: 120px" @change="handleChange">
            <a-select-option :value="opt.id" v-for="opt in allClasses" :key="opt.id">{{ opt.cls }}</a-select-option>
        </a-select>
    </a-form-item>
    <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="全部">
            <myTable :columns="columns" :data-source="state.allHomeWork" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="已批改" force-render>
            <myTable :columns="columns" :data-source="state.correctedHomework" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="未批改">
            <myTable :columns="columns" :data-source="state.notViewHomework" />
        </a-tab-pane>
    </a-tabs>

    <a-modal v-model:visible="visible" title="打回作业" @ok="handleOk" ok-text="确认" cancel-text="取消">
        <a-form-item label="截止时间"><a-date-picker show-time placeholder="截止时间" @change="onChange" format="YYYY/MM/DD HH:mm:ss"/></a-form-item>
        <a-form-item label="打回理由"><a-textarea v-model:value="state.popUpsData.returnCause" placeholder="请输入打回作业理由"
                :rows="4" /></a-form-item>
    </a-modal>

    <a-modal v-model:visible="correctVisible" title="批改作业" @ok="handleCorrect" ok-text="确认" cancel-text="取消">
        <a-form-item label="分数"><a-input placeholder="分数" v-model:value="state.correctForm.score"/></a-form-item>
        <a-form-item label="评论"><a-textarea v-model:value="state.correctForm.comment" placeholder="描述内容"
                :rows="4" /></a-form-item>
    </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, createVNode, toRaw } from 'vue';
import myTable from '@/components/Table/index.vue'
import { useRouter, useRoute } from 'vue-router';
import { getAllClass } from '@/network/user.js'
import { getStudentHomework, returnStudentHomework, markStudentHomework } from '@/network/homework.js';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user'
import { dataClassification } from '@/hooks/fication'
import type { Moment } from 'moment';
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const activeKey = ref('1')
const selectValue = ref('')
const columns = [
    {
        title: '学生',
        dataIndex: 'nickname',
    },
    {
        title: '完成时间',
        dataIndex: 'submitTime',
        align: 'center',
        time: 'date',
    },
    {
        title:'分数',
        dataIndex:'score',
        text:true
    },
    {
        title: '内容描述',
        dataIndex: 'content'
    },
    {
        title: '状态',
        dataIndex: 'returnCause',
        tags: {
            returnCause: true
        }
    },
    {
        title: '文件',
        dataIndex: 'files'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        btns: [
            {
                label: '批改',
                type: 'primary',
                display: true,
                func: (obj: any) => handleCorrecting(obj)
            },
            {
                label: '打回',
                type: 'danger',
                display: true,
                func: (obj: any) => handleRetrun(obj)
            }
        ]

    }
]
const state = reactive({
    allHomeWork: [],
    correctedHomework: [],
    notViewHomework: [],
    popUpsData: {
        homeworkId: '',
        userId: '',
        returnCause: '',
        newEndTime: ''
    },
    correctForm:{
        userId:'',
        homeworkId:'',
        score:'',
        comment:''
    }
})
interface Class {
    id: string | number
    cls: string
}
const allClasses = ref<Class[]>([
    {
        id: '',
        cls: ''
    }
])
getAllClass()
    .then((res: any) => {
        allClasses.value = res.data.data
    })
console.log(route.query, 'query');

function getData() {
    const params = {
        homeworkId: route.query.id,
        clsId: selectValue.value
    }
    getStudentHomework(params)
        .then((res: any) => {
            if (res.data.code === 200) {
                console.log(res.data.data)
                state.allHomeWork = res.data.data
                state.correctedHomework = dataClassification(res.data.data, 'status', 'score').trueArray
                state.notViewHomework = dataClassification(res.data.data, 'status', 'score').falseArray
                console.log(state);
            }
        })
}
getData()
const correctVisible = ref(false)
function handleCorrecting(obj: any) {
    state.correctForm.userId = obj.userId
    state.correctForm.homeworkId = obj.homeworkId
    correctVisible.value = true
    console.log(obj);
}

const handleCorrect = () => {
    markStudentHomework(toRaw(state.correctForm))
        .then((res:any) => {
            if(res.data.code === 200){
                message.success('批改成功')
                correctVisible.value = false
            }else{
                message.error(res.data.msg)
            }
        })
}

const visible = ref<boolean>(false)
function handleRetrun(obj: any) {
    visible.value = true
    console.log(obj)
    state.popUpsData.homeworkId = obj.homeworkId
    state.popUpsData.userId = obj.userId
}

const handleOk = (e: MouseEvent) => {
    console.log(toRaw(state.popUpsData));
    returnStudentHomework(toRaw(state.popUpsData))
        .then((res: any) => {
            if (res.data.code === 200) {
                message.success('打回成功')
            } else {
                message.error(res.data.msg)
            }
        })
    getData()
    visible.value = false;
};

const selctValue = ref()
function handleChange(val: any) {
    console.log(val)
    getData()
}

const onChange = (value: Moment[], dateString: string[]) => {
    state.popUpsData.newEndTime = dateString.toString()
};
</script>
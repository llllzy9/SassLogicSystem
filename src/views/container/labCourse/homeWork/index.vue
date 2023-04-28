<template>
    <div class="btn-wrap" v-if="userStore.isTeacher">
        <a-button type="primary" @click="assignHomework">布置作业</a-button>
    </div>
    <myTable :loading="data.loading" :dataSource="data.homeWorkList" :columns="state.columns">
    </myTable>
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
    <div class="modal">
        <a-modal v-model:visible="visible" width="600px" title="布置作业">
            <template #footer>
            </template>
            <a-form ref="formRef" :model="state.formState" :rules="rules" :label-col="{ span: 4 }"
                :wrapper-col="{ span: 14 }">
                <a-form-item label="标题" name="title">
                    <a-input v-model:value="state.formState.title" placeholder="请输入标题" />
                </a-form-item>
                <a-form-item label="分值" name="score">
                    <a-input v-model:value="state.formState.score" placeholder="请设置分数" />
                </a-form-item>
                <a-form-item label="时间" name="startTime">
                    <a-space direction="vertical">
                        <a-date-picker v-model:value="state.formState.startTime" :disabled-date="disabledStartDate"
                            show-time format="YYYY-MM-DD HH:mm:ss" placeholder="开始时间" @openChange="handleStartOpenChange" />
                        <a-date-picker v-model:value="state.formState.endTime" :disabled-date="disabledEndDate" show-time
                            format="YYYY-MM-DD HH:mm:ss" placeholder="截至时间" :open="endOpen"
                            @openChange="handleEndOpenChange" />
                    </a-space>
                    <!-- <a-range-picker v-model:value="state.formState.time" style="width: 100%" :format="dateFormat"/> -->
                </a-form-item>
                <a-form-item label="班级" name="clsIds">
                    <a-select v-model:value="state.formState.clsIds" mode="tags" placeholder="请选择参加的班级">
                        <a-select-option value="1">计算机科学与技术1907</a-select-option>
                        <a-select-option value="2">计算机科学与技术1908</a-select-option>
                        <a-select-option value="2">计算机科学与技术1909</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="内容" name="content">
                    <a-textarea v-model:value="state.formState.content" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="formSubmit">提交</a-button>
                    <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
                </a-form-item>
            </a-form>
        </a-modal>

    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue'
import myTable from '@/components/Table/index.vue'
import { distributeHomework } from '@/network/course.js'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
interface Props {
    data: object
}
const props = withDefaults(defineProps<Props>(), {
    data: () => {
        return {
            homeWorkList: []
        }
    }
})

const state = reactive({
    columns: [
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
            text: true
        },
        {
            title: '完成时间',
            dataIndex: 'startTime',
            time: true,
            align:'center'
        },
        {
            title: '状态',
            dataIndex: 'completionStatus',
            tags: true,
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
                    type: 'primary',
                    display:!userStore.isTeacher
                },
                {
                    label: '编辑',
                    func: (obj: any) => openFullModal(obj),
                    type: 'primary',
                    display:userStore.isTeacher
                },
                {
                    label: '删除',
                    func: (obj: any) => handleView(obj),
                    type: 'danger',
                    display:userStore.isTeacher
                }
            ]

        }
    ],
    fullPopUps: {
        title: '',
        score: '',
        startTime: '',
        endTime: '',
        content: ''
    },
    formState: {
        title: '',
        time: '',
        startTime: '',
        endTime: '',
        clsIds: [],
        score: '',
        content: ''
    },
})

const fullPopStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    justifyContent: 'space-around',
    height: '10%',
    borderBottom: '2px dashed #eee',
    fontSize: '18px'
}

const fullVisible = ref<boolean>(false)
function openFullModal(obj: any) {
    console.log(obj);
    state.fullPopUps = obj
    fullVisible.value = true
}

function handleDelete(obj: any) {
    console.log(obj);
}

function gotoExam() {
    window.open('http://106.14.20.78:8080/szljTest', '_brank')
}

const rules = {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    startTime: [{ required: true, message: '请选择时间范围', trigger: 'blur' }],
    clsIds: [{ required: true, message: '请选择参加班级', trigger: 'change' }],
    score: [{ required: true, message: '请设置分数', trigger: 'change' }],
    content: [{ required: true, message: '请输入内容', trigger: 'change' }],
};


const endOpen = ref<boolean>(false);
const disabledStartDate = (startTime: any) => {
    if (!startTime || !state.formState.endTime) return false;
    return startTime.valueOf() > state.formState.endTime.valueOf();
};
const disabledEndDate = (endTime: any) => {
    if (!endTime || !state.formState.startTime) return false;
    return state.formState.startTime.valueOf() >= endTime.valueOf();
};
const handleStartOpenChange = (open: boolean) => {
    if (!open) endOpen.value = true
};
const handleEndOpenChange = (open: boolean) => {
    endOpen.value = open;
};

const visible = ref(false)
function assignHomework() {
    visible.value = true
}
const formRef = ref()
const formSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            console.log('values', state.formState, toRaw(state.formState))
            distributeHomework(toRaw(state.formState))
                .then((res: any) => {
                    console.log(res.data)
                })
        })
        .catch((error: any) => {
            console.log('error', error);
        });
}
const resetForm = () => {
    formRef.value.resetFields();
}
</script>
<style>
.btn-wrap {
    margin-bottom: 10px;
}
</style>
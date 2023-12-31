<template>
    <div class="btn-wrap" v-if="roles == 2">
        <a-button type="primary" @click="assignHomework">布置作业</a-button>
    </div>
    <myTable :loading="data.loading" :dataSource="data.homeWorkList" :columns="state.columns">
    </myTable>
    <div class="full-popUps">
        <DoHomework :fullPopUps="state.fullPopUps" ref="popRef" />
    </div>
    <div class="modal">
        <a-modal v-model:visible="visible" width="600px" :title="modalTiele">
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
                <a-form-item label="开课时间" name="startTime">

                    <a-date-picker v-model:value="startTimeVal" show-time format="YYYY-MM-DD HH:mm:ss" placeholder="开课时间"
                        @change="onStartChange" :disabled-date="disabledStartDate" @openChange="handleStartOpenChange" />

                </a-form-item>
                <a-form-item label="结课时间" name="startTime">
                    <a-date-picker v-model:value="endTimeVal" :disabled-date="disabledEndDate" show-time
                        format="YYYY-MM-DD HH:mm:ss" placeholder="结课时间" :open="endOpen" @openChange="handleEndOpenChange"
                        @change="onEndChange" />

                </a-form-item>
                <a-form-item label="班级" name="clsIds">
                    <a-select v-model:value="state.formState.clsIds" mode="tags" placeholder="请选择参加的班级">
                        <a-select-option :value="opt.id" v-for="opt in allClasses" :key="opt.id">{{ opt.cls }}</a-select-option>
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
import { reactive, ref, toRaw, inject, defineEmits, createVNode } from 'vue'
import myTable from '@/components/Table/index.vue'
import DoHomework from '@/components/DoHomework/index.vue'
import { Modal, message } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { distributeHomework,deleteHomeWork, modifyDistributeHomework } from '@/network/homework.js'
import {getAllClass} from '@/network/user.js'
import type { Moment } from 'moment';
import moment from 'moment';
const roles = inject('roles')
const emit = defineEmits(['refresh'])
interface Props {
    data: {
        loading: boolean
        homeWorkList: object[]
        courseId:string
    }
}
const props = withDefaults(defineProps<Props>(), {

})
interface Class{
    id:string | number
    cls:string
}
const allClasses = ref<Class[]>([
    {
        id:'',
        cls:''
    }
])
getAllClass()
    .then((res:any) => {
        allClasses.value = res.data.data
    })
const state = reactive({
    columns: [
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
            title: '时间范围',
            dataIndex: 'time',
            time: 'ranger',
            align: 'center'
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
                    type: 'primary',
                    display: !(roles == 2)
                },
                {
                    label: '编辑',
                    func: (obj: any) => openEditModal(obj),
                    type: 'primary',
                    display: roles == 2
                },
                {
                    label: '删除',
                    func: (obj: any) => handleDelete(obj),
                    type: 'danger',
                    display: roles == 2
                }
            ]

        }
    ],
    fullPopUps: {
        id:'',
        title:'',
        score:'',
        startTime:'',
        endTime:'',
        content:'',
    },
    formState: {
        title: '',
        startTime: '',
        endTime: '',
        clsIds: [],
        score: '',
        content: '',
        courseId:''
    },
})
const modalTiele = ref('')
function openEditModal(obj:any){
    modalTiele.value = '编辑'
    console.log(new Date(obj.startTime));
    startTimeVal.value =  moment(obj.startTime)
    endTimeVal.value = moment(obj.endTime)
    visible.value = true
    state.formState = obj
}

const popRef = ref()
function openFullModal(obj: any) {
    console.log(obj);
    state.fullPopUps = obj
    popRef.value.openFullModal(obj.id)
}

function handleDelete(obj: any) {
    console.log(obj)
    Modal.confirm({
        title: () => '你确定要删除这个作业吗?',
        icon: () => createVNode(ExclamationCircleOutlined),
        okText: () => '删除',
        okType: 'danger',
        cancelText: () => '取消',
        onOk() {
            deleteHomeWork({
                id:obj.id
            })
                .then((res:any) => {
                    if(res.data.code === 200){
                        message.success('删除成功')
                        emit('refresh')
                    }
                })
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}


const rules = {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    startTime: [{ required: true, message: '请选择时间范围', trigger: 'blur' }],
    clsIds: [{ required: true, message: '请选择参加班级', trigger: 'change' }],
    score: [{ required: true, message: '请设置分数', trigger: 'change' }],
    content: [{ required: true, message: '请输入内容', trigger: 'change' }],
};

const startTimeVal = ref<Moment>()
const endTimeVal = ref<Moment>()
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
    modalTiele.value = '布置作业'
    visible.value = true
}
const formRef = ref()
const formSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            console.log('values', state.formState, toRaw(state.formState))
            const reqdata = toRaw(state.formState)
            reqdata.courseId = props.data.courseId
            const request = modalTiele.value === '布置作业'? distributeHomework : modifyDistributeHomework
            request(reqdata)
                .then((res: any) => {
                    if(res.data.code === 200){
                        emit('refresh')
                        visible.value = false
                    }else{
                        message.error(res.data.msg)
                    }
                })
        })
        .catch((error: any) => {
            console.log('error', error);
        });
}
const resetForm = () => {
    formRef.value.resetFields();
}

function onStartChange(value: any[], dateString: string[]) {
    state.formState.startTime = dateString.toString()
}
function onEndChange(value: any[], dateString: string[]) {
    state.formState.endTime = dateString.toString()
}
</script>
<style>
.btn-wrap {
    margin-bottom: 10px;
}
</style>
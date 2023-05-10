<template>
    <a-modal v-model:visible="fullVisible" :title="fullPopUps.title" width="100%" wrapClassName="full-modal" :afterClose="afterClose">
        <div class="top-info" style="height: 10%;border-bottom: 2px dashed #eee;">
            <a-row>
                <a-col :span="2"><span>满分：{{ fullPopUps.score }}</span></a-col>
            </a-row>
            <a-row>
                <a-col :span="24">
                    <p>作答时间：{{ fullPopUps.startTime }} ~ {{ fullPopUps.endTime }}</p>
                </a-col>
            </a-row>
        </div>
        <div class="topic-content">
            <div class="content" style="height: 40vh;margin-top: 5px;">
                {{ fullPopUps.content }}
            </div>
            <div class="upload-box" style="display: flex;flex-direction: column;gap: 20px;">
                <a-textarea v-model:value="state.formData.content" placeholder="描述内容" :rows="4" />
                <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true"
                    :customRequest="customRequest" @change="handleChange">
                    <p class="ant-upload-drag-icon">
                        <inbox-outlined></inbox-outlined>
                    </p>
                    <p class="ant-upload-text">单击或拖动文件到此区域以上载</p>
                    <p class="ant-upload-hint">
                        支持单次或批量上传。
                    </p>
                </a-upload-dragger>
            </div>

        </div>
        <template #footer>
            <a-button type="primary" value="large" @click="gotoExam">进入实验</a-button>
            <a-button value="large" @click="handleSubmit">提交上传</a-button>

        </template>
    </a-modal>
</template>

<script setup lang="ts">
import { uploadFile } from '@/network/upload'
import { ref, reactive } from 'vue';
import { submitHomework } from '@/network/homework.js';
import { message } from 'ant-design-vue';
import { InboxOutlined } from '@ant-design/icons-vue';
const emit = defineEmits(['refresh'])
interface Props{
    fullPopUps:{
        id:string
        title:string
        score:string
        startTime:string
        endTime:string
        content:string
    }
}
const props = withDefaults(defineProps<Props>(), {

})
interface State{
    formData:{
        content:string
        files:string[]
        homeworkId:string|number
    }
}
const fullVisible = ref<boolean>(false)
const state = reactive<State>({
    formData: {
        content: '',
        files: [],
        homeworkId: ''
    }
})

function openFullModal(id:any) {
    console.log(id);
    state.formData.homeworkId = id
    fullVisible.value = true
}
const fileList = ref([])
function customRequest(file: any) {
    const fileName = file.file.name
    const formData = new FormData()
    formData.append('file', file.file, fileName)
    uploadFile(formData)
        .then((res: any) => {
            state.formData.files.push(res.data.data)
            file.onSuccess(file)
        }).catch((err: any) => {
            file.onError(err)
        })
}
const handleChange = (info: any) => {
    const status = info.file.status;
    if (status !== 'uploading') {
        console.log(info.file, info.fileList);
    }
    if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
    } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
    }
};


function gotoExam() {
    window.open('http://106.14.20.78:8080/szljTest', '_brank')
}

function handleSubmit() {
    if ((state.formData.files.length >= 1)) {
        submitHomework(state.formData)
            .then((res: any) => {
                if (res.data.code === 200) {
                    message.success('提交成功')
                    fullVisible.value = false
                    emit('refresh')
                }else{
                    message.error(res.data.msg)
                }
            }).catch((err: any) => {
                message.error('提交失败，请重新再试！')
                console.log(err)
            })
    } else {
        message.error('上传文件不能为空')
        return
    }
}

function afterClose() {
    state.formData = {
        content: '',
        files: [],
        homeworkId: ''
    }
}

defineExpose({openFullModal})
</script>
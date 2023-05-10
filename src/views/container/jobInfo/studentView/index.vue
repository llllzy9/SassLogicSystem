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
        <a-modal v-model:visible="fullVisible" :title="state.fullPopUps.title" width="100%" wrapClassName="full-modal">
            <div class="top-info" style="height: 10%;border-bottom: 2px dashed #eee;">
                <a-row>
                    <a-col :span="2"><span>满分：{{ state.fullPopUps.score }}</span></a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <p>作答时间：{{ state.fullPopUps.startTime }} ~ {{ state.fullPopUps.endTime }}</p>
                    </a-col>
                </a-row>
            </div>
            <div class="topic-content">
                <div class="content" style="height: 40vh;">
                    {{ state.fullPopUps.content }}
                </div>
                <div class="upload-box" style="display: flex;flex-direction: column;gap: 20px;">
                    <a-textarea v-model:value="state.formData.content" placeholder="描述内容" :rows="4" />
                    <a-upload-dragger v-model:fileList="state.formData.files" name="file" :multiple="true" :customRequest="customRequest" @change="handleChange">
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
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, inject } from 'vue';
import myTable from '@/components/Table/index.vue'
import { getHomework, submitHomework } from '@/network/homework.js';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user'
import { uploadFile} from '@/network/upload'
import { InboxOutlined } from '@ant-design/icons-vue';
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

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
function customRequest(file:any) { 
    const fileName = file.file.name
    const formData = new FormData()    
    formData.append('files', file.file, fileName)
    uploadFile(formData)
        .then((res: any) => {
            state.formData.files.push(res.data.data)
        }).catch((err: any) => {
            file.onError(err)
        })
}
const handleChange = (info: FileInfo) => {
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
        btns: [
            {
                label: '开始',
                func: (obj: any) => openFullModal(obj),
                display: roles !== 2,
                type: 'primary'
            }
        ]
    }
]
const activeKey = ref('1')
const state = reactive({
    allHomeWork: [],
    doneHomeWork: [],
    noneHomeWork: [],
    fullPopUps: {
        title: '',
        score: '',
        startTime: '',
        endTime: '',
        content: '',
    },
    formData:{
            content:'',
            files:[],
            homeworkId:''
        }
})

const fullVisible = ref<boolean>(false)
function openFullModal(obj: any) {
    console.log(obj,'obj');
    state.fullPopUps = obj
    state.formData.homeworkId = obj.id
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

function handleSubmit() {
    console.log(state.formData)
    if((state.formData.files.length >= 1)){
        submitHomework(state.formData)
            .then((res:any) => {
                if(res.data.code === 200){
                    console.log(res.data)
                    message.success('提交成功')
                    fullVisible.value = false
                }
            }).catch((err:any) => {
                message.error('提交失败，请重新再试！')
                console.log(err)
            })
    }else{
        message.error('上传文件不能为空')
        return
    }
}
</script>
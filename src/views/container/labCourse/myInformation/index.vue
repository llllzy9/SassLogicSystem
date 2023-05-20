<template>
    <div class="btn-wrap" v-if="roles == 2">
        <a-button type="primary" @click="publishInformation">发布信息</a-button>
    </div>
    <div class="info-list">
        <a-list item-layout="horizontal" :data-source="data.infoList" :loading="data.loading">
            <template #renderItem="{ item }">
                <a-list-item>
                    <template #actions>
                        <a @click="deleteInfo(item.id)">删除</a>
                        <a @click="openModal(item)">查看</a>
                    </template>
                    <a-list-item-meta :description="item.content">
                        <template #title>
                            <a-badge :dot="courseStore.inforState(item.state)">
                                <a href="https://www.antdv.com/">{{ item.theme }}</a>
                            </a-badge>
                        </template>
                        <template #avatar>
                            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </template>
                    </a-list-item-meta>
                    <div style="color:#aaa">
                        <span style="margin-right: .5rem;">{{ item.publishTime }}</span>
                        <span v-show="!courseStore.inforState(item.state)">{{ '已读' }}</span>
                    </div>
                </a-list-item>

            </template>
        </a-list>
    </div>

    <div class="popUps">
        <a-modal v-model:visible="inforVisible" width="800px" :title="state.popData.theme">
            <template #footer>
                <a-button key="back" @click="handleCancel" type="primary">确认</a-button>
            </template>
            <div style="display: flex;align-items: center;padding-bottom: 10px;">
                <a-avatar :size="40" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span style="margin-left: .5rem;color:#666;margin-right: .5rem;">{{ state.popData.nickname }}</span>
                <a-tag color="orange">老师</a-tag>
                <span style="color:#aaa">{{ state.popData.publishTime }}</span>
            </div>
            <div style="margin:15px 45px">
                {{ state.popData.content }}
            </div>

        </a-modal>
    </div>

    <div class="modal">
        <a-modal v-model:visible="visible" width="600px" title="发布信息">
            <template #footer>
            </template>
            <a-form ref="formRef" :model="state.formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
                <a-form-item label="主题" name="theme">
                    <a-input v-model:value="state.formState.theme" placeholder="请输入标题" />
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
import { reactive, ref, createVNode, toRaw, inject } from 'vue';
import { setMessageState, deleteMessage, publishMessage } from '@/network/course.js'
import { getAllClass } from '@/network/user.js'
import { useCourseStore } from '@/stores/course'
import { Modal, message } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
const roles = inject('roles')
const emit = defineEmits(['refresh'])
const courseStore = useCourseStore()
interface Props {
    data: {
        infoList: object[]
        loading: boolean
    }
}
const props = withDefaults(defineProps<Props>(), {
})
const state = reactive({
    popData: {
        nickname:'',
        publishTime:'',
        content: '',
        theme: '',
    },
    formState: {
        theme: '',
        clsIds: [],
        content: ''
    }
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
const inforVisible = ref(false)
const openModal = (obj: any) => {
    const params = {
        id: obj.id
    }
    setMessageState(params)
        .then((res: any) => {
            console.log(res.data);
        })
    state.popData = obj
    inforVisible.value = true
}
const handleCancel = () => {
    visible.value = false;
    console.log('guanbi');
};

function deleteInfo(id: number) {
    Modal.confirm({
        title: () => '你确定要删除这个信息吗?',
        icon: () => createVNode(ExclamationCircleOutlined),
        okText: () => '是的',
        okType: 'danger',
        cancelText: () => '取消',
        onOk() {
            deleteMessage({
                id: id
            })
                .then((res: any) => {
                    if (res.data.code === 200) {
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
const visible = ref(false)
function publishInformation() {
    visible.value = true
}


const formRef = ref()
const formSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            publishMessage(toRaw(state.formState))
                .then((res: any) => {
                    if (res.data.code === 200) {
                        console.log(res.data);
                        message.success(res.data.msg)
                        visible.value = false
                        emit('refresh')
                    }else{
                        message.error(res.data.msg)
                    }
                })
        })
}
const resetForm = () => {
    formRef.value.resetFields();
}
</script>
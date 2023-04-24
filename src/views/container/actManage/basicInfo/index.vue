<template>
    <a-form :model="formData" style="width: 400px;" :rules="rules" ref="formRef">
        <a-form-item label="姓名" name="nickname">
            <a-input v-model:value="formData.nickname" :disabled="!isChange" />
        </a-form-item>
        <a-form-item label="邮箱" name="email">
            <a-input v-model:value="formData.email" :disabled="!isChange" />
        </a-form-item>
        <a-form-item label="班级" name="clsName">
            <a-select ref="select" v-model:value="formData.clsName" @change="optionChange" :disabled="!isChange">
                <a-select-option v-for="opt in state.class" :key="opt.id" :value="opt.id">{{ opt.cls }}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="性别" name="sex">
            <a-radio-group v-model:value="formData.sex" :disabled="!isChange">
                <a-radio :value="'0'">男</a-radio>
                <a-radio :value="'1'">女</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item label="手机号" name="phoneNumber">
            <a-input v-model:value="formData.phoneNumber" :disabled="!isChange" />
        </a-form-item>
        <a-form-item label="学校" name="school">
            <a-input v-model:value="formData.school" :disabled="!isChange" />
        </a-form-item>
        <a-form-item label="头像">
            <a-upload v-model:file-list="fileList" name="image" list-type="picture-card" class="avatar-uploader"
                :show-upload-list="false" action="http://154.204.60.38:8000/user/uploadImage" :headers="state.headers"
                :before-upload="beforeUpload" @change="handleChange">
                <a-image v-if="imageUrl" :src="imageUrl" alt="avatar" :disabled="isChange" :preview="false" />
                <div v-else>
                    <loading-outlined v-if="loading"></loading-outlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">上传</div>
                </div>
            </a-upload>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="submit">{{ isChange ? '保存' : '修改' }}</a-button>
            <a-button style="margin-left: 10px" v-show="isChange" @click="resetForm">重置</a-button>
        </a-form-item>
    </a-form>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { message } from 'ant-design-vue';
import { changeUserInfo, getUserInfo, getAllClass } from '@/network/user.js'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

getUserInfo()
    .then((res: any) => {
        if (res.data.code === 200) {
            state.formData = res.data.data
            imageUrl.value = userStore.avatarImg()
        }
    })
getAllClass()
    .then((res: any) => {
        console.log(res.data);
        if (res.data.code === 200) {
            state.class = res.data.data
        }
        console.log(state.class, ' state.calss');

    })

interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    url?: string;
    type?: string;
    size: number;
    originFileObj: any;
}

interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
}
const isChange = ref<boolean>(false)
const userStore = useUserStore()
const fileList = ref([])
const formRef = ref();
const loading = ref<boolean>(false)
const imageUrl = ref<string>('')
const state = reactive({
    headers: {
        authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    formData: {
        nickname: '',
        email: '',
        clsName: '',
        clsId: '',
        sex: '',
        phoneNumber: '',
        school: ''
    },
    class: []
})
const { formData } = toRefs(state)

function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
}
const handleChange = (info: FileInfo) => {
    if (info.file.status === 'uploading') {
        loading.value = true;
        return;
    }
    if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url;
            loading.value = false;
            message.success('上传成功');
        });
    }
    if (info.file.status === 'error') {
        loading.value = false;
        message.error('上传失败');
    }
};
const beforeUpload = (file: FileItem) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传PNG/JPEG格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('照片不能大于2M！');
    }
    return isJpgOrPng && isLt2M;
};

const submit = () => {
    if (!isChange.value) return isChange.value = !isChange.value
    formRef.value
        .validate().then(() => {
            changeUserInfo(state.formData)
                .then((res: any) => {
                    if (res.data.code === 200) {
                        Object.assign(userStore.userInfo, state.formData)
                        getUserInfo()
                        message.success(res.data.msg)
                        isChange.value = false
                    }
                })
                .catch((err: any) => {
                    message.error('修改失败')
                })
        })
}

const optionChange = (value: any) => {
    console.log(value)
    formData.value.clsId = value
}

const rules = {
    nickname: [{ required: true, message: '请输入长度为6以下的昵称', max: 6, trigger: 'change' }],
    email:[{ required: true, message: '请输入正确的邮箱格式', trigger: 'change' }],
    clsName: [{ required: true, message: '请选择班级', trigger: 'blur' }],
    sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    phoneNumber: [{ required: true, message: '请输入正确格式的手机号码', max: 11, min: 11, trigger: 'blur', type: 'string' }],
    school: [{ required: true, message: '请输入学校名称', trigger: 'change' }],
};

const resetForm = () => {
    formRef.value.resetFields();
};
</script>
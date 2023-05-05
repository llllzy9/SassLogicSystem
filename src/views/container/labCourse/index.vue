<template>
    <div class="course-container">
        <div class="title-wrap">
            <div>
                {{ roles == 2 ? '我教的课：' : '我学的课：' }}
            </div>
            <div class="addBtn" v-if="roles == 2">
                <a-button type="primary" shape="round" @click="addCourseModal">添加课程</a-button>
            </div>
        </div>
        <div class="content">
            <a-skeleton active :loading="skeletonLoading" />
            <CardList :dataList="state.dataList" v-if="state.dataList" @refresh="getData" />
            <a-empty description="您暂时还没有课程哦~" v-else />
        </div>


        <div class="modal">
            <a-modal v-model:visible="visible" width="600px" title="添加课程">
                <template #footer>
                </template>
                <a-form ref="formRef" :model="state.formState" :rules="rules" :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 14 }">
                    <a-form-item ref="name" label="课程名" name="courseName">
                        <a-input v-model:value="state.formState.courseName" placeholder="请输入课程名" />
                    </a-form-item>
                    <a-form-item label="开课时间" name="startTime">

                        <a-date-picker v-model:value="startTimeVal" show-time format="YYYY-MM-DD HH:mm:ss"
                            placeholder="开课时间" @change="onStartChange" :disabled-date="disabledStartDate"
                            @openChange="handleStartOpenChange" />

                    </a-form-item>
                    <a-form-item label="结课时间" name="startTime">
                        <a-date-picker v-model:value="endTimeVal" :disabled-date="disabledEndDate" show-time
                            format="YYYY-MM-DD HH:mm:ss" placeholder="结课时间" :open="endOpen"
                            @openChange="handleEndOpenChange" @change="onEndChange" />


                    </a-form-item>
                    <a-form-item label="班级" name="clsIds">
                        <a-select v-model:value="state.formState.clsIds" mode="tags" placeholder="请选择参加的班级">
                            <a-select-option value="1">计算机科学与技术1907</a-select-option>
                            <a-select-option value="2">计算机科学与技术1909</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="实验平台" name="experimentalPlatform">
                        <a-select v-model:value="state.formState.experimentalPlatform" placeholder="请选择实验平台">
                            <a-select-option value="1">数字逻辑虚拟仿真实验平台</a-select-option>
                            <a-select-option value="2">计算机网络虚拟仿真实验平台</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="课程封面">
                        <a-upload v-model:file-list="state.fileList" class="avatar-uploader" name="imageName"
                            :show-upload-list="true" list-type="picture-card" :headers="headers"
                            :before-upload="beforeUpload" :customRequest="customRequest" @change="handleChange">
                            <a-img v-if="state.formState.imageName" :src="state.formState.imageName" alt="avatar" />
                            <div>
                                <loading-outlined v-if="imgLoading"></loading-outlined>
                                <plus-outlined v-else></plus-outlined>
                                <div class="ant-upload-text">上传</div>
                            </div>
                        </a-upload>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="formSubmit" :loading="subLoading">提交</a-button>
                        <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
                    </a-form-item>
                </a-form>
            </a-modal>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw, inject, nextTick } from 'vue';
import CardList from '@/components/CardList/index.vue'
import { getStudentCourse, addCourse, getCourse } from '@/network/course.js'
import { uploadImage, getImage } from '@/network/upload.js'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user';
import moment from 'moment';
import type { Moment } from 'moment';
const roles = inject('roles')
const userStore = useUserStore()
const skeletonLoading = ref<boolean>(false)
skeletonLoading.value = true
const state = reactive({
    //课程数据
    dataList: [],
    formState: {
        courseName: '',
        startTime: '',
        endTime: '',
        clsIds: [],
        experimentalPlatform: '',
        imageName: ''
    },
    fileList: []
})

//数据请求
async function getData() {
    try {
        const getCourseData = roles == 2 ? getCourse : getStudentCourse
        const respose = await getCourseData()
        if (respose.data.code === 200) {
            state.dataList = respose.data.data
            message.success('获取成功')
            skeletonLoading.value = false
        } else {
            message.error('服务繁忙')
            throw new Error(respose.data.msg)
        }
    } catch (error) {
        console.log(error)
    }
}
getData()

//添加课程
const visible = ref(false)
const addCourseModal = () => {
    visible.value = true
}
//表单验证规则
const rules = {
    courseName: [{ required: true, message: '请输入课程名', trigger: 'blur' }],
    startTime: [{ required: true, message: '请选择时间范围', trigger: 'blur' }],
    endTime: [{ required: true, message: '请选择时间范围', trigger: 'blur' }],
    clsIds: [{ required: true, message: '请选择参加班级', trigger: 'change' }],
    experimentalPlatform: [{ required: true, message: '请选择实验平台', trigger: 'change' }],
};
//自定义上传文件
const customRequest = (image: any) => {
    const fileName = image.file.name
    const formData = new FormData()
    formData.append('image', image.file, fileName)
    uploadImage(formData)
        .then((res: any) => {
            state.formState.imageName = res.data.data;
            getImage({
                imageName: res.data.data
            })
                .then((respose: any) => {
                    message.success(fileName + '上传成功')
                    image.onSuccess(respose.data.data, image)
                    imgLoading.value = false;
                })

        }).catch((err: any) => {
            image.onError(err)
            imgLoading.value = false;

        })
}
//上传请求头
const headers = {
    authorization: `Bearer ${sessionStorage.getItem('token')}`,
}
const imgLoading = ref(false)
const handleChange = (info: any) => {
    if (info.file.status === 'done') {
        imgLoading.value = false
    }
    if (info.file.status === 'error') {
        imgLoading.value = false;
        message.error('上传失败');
    }
};
const beforeUpload = (file: any) => {
    imgLoading.value = true
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只可以上传JPG/PNG格式!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小不能超过2MB!');

    }
    return isJpgOrPng && isLt2M;
};

//日期选择器
const startTimeVal = ref<Moment>()
const endTimeVal = ref<Moment>()
const endOpen = ref<boolean>(false);
const disabledStartDate = (startTime: any) => {
    if (!startTime || !state.formState.endTime) {
        return false;
    }
    return startTime.valueOf() > state.formState.endTime.valueOf();
};
const disabledEndDate = (endTime: any) => {
    if (!endTime || !state.formState.startTime) {
        return false;
    }
    return state.formState.startTime.valueOf() >= endTime.valueOf();
};
const handleStartOpenChange = (open: boolean) => {
    if (!open) {
        endOpen.value = true;
    }
};
const handleEndOpenChange = (open: boolean) => {
    endOpen.value = open;
};
function onStartChange(value: any[], dateString: string[]) {
    state.formState.startTime = dateString.toString()
}
function onEndChange(value: any[], dateString: string[]) {
    state.formState.endTime = dateString.toString()
}

//提交添加课程
const subLoading = ref<boolean>(false)
const formRef = ref()
const formSubmit = () => {
    subLoading.value = true
    formRef.value
        .validate()
        .then(() => {
            console.log('values', state.formState, toRaw(state.formState))
            const data = toRaw(state.formState)
            addCourse(data)
                .then((res: any) => {
                    if (res.data.code === 200) {
                        subLoading.value = false
                        getData()
                        formRef.value.resetFields();
                        visible.value = false
                        message.success('添加成功')

                    } else {
                        message.error(res.data.msg)
                    }
                }).catch((err: any) => {
                    message.error(err.data.msg)
                    subLoading.value = false
                })

        })
        .catch((error: any) => {
            console.log('error', error)
        });
}
const resetForm = () => {
    formRef.value.resetFields();
}
</script>

<style lang="scss">
.course-container {
    display: flex;
    flex-direction: column;

    .title-wrap {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 600;
        color: #2d2d22;
    }

    /* align-items: baseline; */

    .form-wrap {
        height: 50px;
        margin-bottom: 20px;
    }

    .content {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
    }
}

::v-deep .avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

::v-deep .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

::v-deep .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
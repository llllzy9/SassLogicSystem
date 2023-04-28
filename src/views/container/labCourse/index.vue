<template>
    <div class="course-container">
        <div class="title-wrap">
            <div>
                {{ userStore.isTeacher ? '我教的课：' : '我学的课：' }}
            </div>
            <div class="addBtn" v-if="userStore.isTeacher">
                <a-button type="primary" shape="round" @click="openModal('addCourse')">添加课程</a-button>
            </div>
        </div>
        <div class="content">
            <a-skeleton active :loading="skeletonLoading" />
            <CardList :dataList="state.dataList" :openModal="openModal" />
        </div>
        <div class="modal">
            <a-modal v-model:visible="visible" width="600px" title="添加课程">
                <template #footer>
                </template>
                <a-form ref="formRef" :model="state.formState" :rules="rules" :label-col="{ span: 4 }"
                    :wrapper-col="{ span: 14 }">
                    <a-form-item ref="name" label="课程名" name="course">
                        <a-input v-model:value="state.formState.course" placeholder="请输入课程名" />
                    </a-form-item>
                    <a-form-item label="开课时间" name="startTime">
                        <a-range-picker v-model:value="state.formState.startTime" style="width: 100%" />
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
                        <a-upload v-model:file-list="state.fileList" class="avatar-uploader" name="image"
                            :show-upload-list="true" list-type="picture-card" :customRequest="customRequest" :beforeUpload="beforeUpload">
                            <img v-if="state.formState.image" :src="state.formState.image" alt="avatar" />
                            <div v-else>
                                <loading-outlined v-if="imgLoading"></loading-outlined>
                                <plus-outlined v-else></plus-outlined>
                                <div class="ant-upload-text">上传</div>
                            </div>

                        </a-upload>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="formSubmit">提交</a-button>
                        <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
                    </a-form-item>
                </a-form>
            </a-modal>

        </div>
    </div>
</template>

<script lang="ts" setup>
import CardList from '@/components/CardList/index.vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getStudentCourse, addCourse } from '@/network/course.js'
import { ref, reactive, inject, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
const router = useRouter()
const skeletonLoading = ref<boolean>(false)
skeletonLoading.value = true
console.log(userStore.isTeacher);

//获取学生课程
getStudentCourse().then((res: any) => {
    if (res.data.code === 200) {
        state.dataList = res.data.data
        skeletonLoading.value = false
    } else {
        return Promise.reject(res.data.msg)
    }
}).catch((err: any) => console.log(err))

//获取老师课程

const state = reactive({
    //课程数据
    dataList: [],
    formState: {
        course: '',
        startTime: '',
        clsIds: [],
        experimentalPlatform: [],
        image: ''
    },
    fileList: []
})

//打开弹窗
const visible = ref(false)
function openModal(str: string, obj?: any, i?: number,) {
    if (str === 'exam') {
        window.open('https://www.baidu.com', '_blank');
    } else if (str === 'detail') {
        router.push({
            name: 'courseDetail',
            query: obj
        })
    } else if (str === 'addCourse') {
        visible.value = true
        formRef.value.resetFields();
    }
}

const customRequest = (image: any) => {
    console.log(image, 'image');
    const form = new FormData()

    // const formDataObj = {};
    // for (let [key, value] of form.entries()) {
    //     formDataObj[key] = value;
    // }
    // console.log(formDataObj,'formDataObj');
    
}

// function getBase64(img: Blob, callback: (base64Url: string) => void) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// }
const imgLoading = ref(false)
// const handleChange = (info:any) => {
//     if (info.file.status === 'uploading') {
//         imgLoading.value = true;
//         return;
//     }
//     if (info.file.status === 'done') {
//         // Get this url from response in real world.
//         getBase64(info.file.originFileObj, (base64Url: string) => {
//             console.log(base64Url,'base64Url');

//             state.formState.image = base64Url;
//             imgLoading.value = false;
//         });
//     }
//     if (info.file.status === 'error') {
//         imgLoading.value = false;
//         message.error('upload error');
//     }
// };

const beforeUpload = (file:any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只可以上传JPG/PNG格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片最大不超过2MB');
    }
    return isJpgOrPng && isLt2M;
};

const rules = {
    course: [{ required: true, message: '请输入课程名', trigger: 'blur' }],
    startTime: [{ required: true, message: '请选择时间范围', trigger: 'blur' }],
    clsIds: [{ required: true, message: '请选择参加班级', trigger: 'change' }],
    experimentalPlatform: [{ required: true, message: '请选择实验平台', trigger: 'change' }],
};
const formRef = ref()
const formSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            console.log(state.fileList, 'fileList');
            console.log('values', state.formState, toRaw(state.formState))
            // addCourse(toRaw(state.formState))
            //     .then((res: any) => {
            //         console.log(res.data);
            //     })
            // visible.value = false
        })
        .catch((error: any) => {
            console.log('error', error);
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
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        row-gap: 30px;
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
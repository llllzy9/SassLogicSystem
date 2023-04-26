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
            <a-skeleton active :loading="loading" />
            <CardList :dataList="state.dataList" :openModal="openModal" />
        </div>
        <div class="modal">
            <a-modal v-model:visible="visible" width="1000px" title="添加课程">
                <myForm :formItem="formItem" />
            </a-modal>

        </div>
    </div>
</template>

<script lang="ts" setup>
import CardList from '@/components/CardList/index.vue'
import { getStudentCourse } from '@/network/course.js'
import { ref, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import myForm from '@/components/Form/index.vue'
const userStore = useUserStore()
const router = useRouter()
const loading = ref<boolean>(false)
loading.value = true
console.log(userStore.isTeacher);

getStudentCourse().then((res: any) => {
    if (res.data.code === 200) {
        state.dataList = res.data.data
        loading.value = false
    } else {
        return Promise.reject(res.data.msg)
    }
}).catch((err: any) => console.log(err))

const state = reactive({
    //课程数据
    dataList: [],
})

const formItem = [
    {
        field: 'course',
        type: 'input',
        name:'course',
        label: '课程名称',
        placeholder: '请输入课程名称'
    },
    {
        field: 'startTime',
        name:'startTime',
        type: 'datepicker',
        label: '开课时间',
    },
    {
        field: 'clsIds',
        type: 'select',
        name:'clsIds',
        label: '班级',
        placeholder: '请选择参加的班级',
        options: [
            {
                title: '计算机科学与技术1907', value: '1'
            },
            {
                title: '计算机科学与技术1909', value: '2'
            }
        ]
    },
    {
        field: 'experimentalPlatform',
        type: 'select',
        name:'experimentalPlatform',
        label: '实验平台',
        placeholder: '请选择实验平台',
        options: [
            {
                title: '数字逻辑虚拟仿真实验平台', value: '1'
            },
            {
                title: '计算机网络虚拟仿真实验平台', value: '2'
            }
        ]
    },
    {
        field: 'image',
        type: 'upload',
        label: '课程封面',
    }
]

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
    }
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
</style>
<template>
    <div class="course-container">
        <div class="title-wrap">
            {{ '我学的课：' }}
        </div>
        <div class="content">
            <a-skeleton active :loading="loading" />
            <CardList :dataList="state.dataList" :openModal="openModal" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import CardList from '@/components/CardList/index.vue'
import { getAllCourse, getHomework, getStudentCourse } from '@/network/course.js'
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const loading = ref<boolean>(false)
loading.value = true
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


//打开弹窗
const visible = ref<boolean>(false)
function openModal(obj: any, i: number, str: string) {
    if (str === 'exam') {
        window.open('https://www.baidu.com', '_blank');
    } else if (str === 'detail') {
        router.push({
            name: 'courseDetail',
            query: obj
        })
        // console.log(obj);
        // let params = {
        //     courseId: obj.id
        // }
        // getHomework(params)
        //     .then((res: any) => {
        //         if (res.data.code === 200) {
        //             state.popUpsData = obj
        //             state.popUpsData.homeworkList = res.data.data
        //             visible.value = true
        //         } else {
        //             return Promise.reject(res.data.msg)
        //         }
        //     }).catch((err: any) => {
        //         console.log(err)
        //     })
    }
}
const handleCancel = () => {
    visible.value = false;
    console.log('guanbi');
};

//打开全屏弹窗
const fullVisible = ref<boolean>(false)
function openFullModal(obj: any) {
    console.log(obj);
    state.fullPopUps = obj
    fullVisible.value = true
}

</script>

<style lang="scss">
.course-container {
    display: flex;
    flex-direction: column;

    .title-wrap {
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

.full-modal {
    .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
    }

    .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);
    }

    .ant-modal-body {
        flex: 1;
    }
}
</style>
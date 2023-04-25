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
import { getStudentCourse } from '@/network/course.js'
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
function openModal(obj: any, i: number, str: string) {
    if (str === 'exam') {
        window.open('https://www.baidu.com', '_blank');
    } else if (str === 'detail') {
        router.push({
            name: 'courseDetail',
            query: obj
        })
    }
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
</style>
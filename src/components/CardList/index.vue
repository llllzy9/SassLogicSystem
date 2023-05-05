<template>
    <div v-for="(card, index) in dataList" :key="index" class="list-container">
        <a-card hoverable style="width: 300px">
            <template #cover>
                <img alt="example" style="object-fit:cover;height: 250px;" :src="courseStore.courseImg(card.avatar)">
            </template>
            <template class="ant-card-actions" #actions>
                <a @click="openModal('exam', card, index,)">进入实验</a>
                <!-- <a-badge :dot="courseStore.inforNum()>0"> -->
                <a @click="openModal('detail', card, index,)">查看详情</a>
                <a @click="openModal('delete', card, index,)">删除课程</a>
                <!-- </a-badge> -->
            </template>
            <a-card-meta :title="card.courseName">
                <template #description>
                    <p>实验操作平台：{{ card.experimentalPlatform }}</p>
                    <p>任课老师：{{ card.nickname }}</p>
                    <p>开课时间：{{ card.startTime }}</p>
                    <p>参加班级：{{ card.class }}</p>
                </template>
            </a-card-meta>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useCourseStore } from '@/stores/course'
import { deleteCourse, getCourse } from '@/network/course.js'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode,defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { Modal, message } from 'ant-design-vue';
const emit = defineEmits(['refresh'])
const router = useRouter()
const courseStore = useCourseStore()

interface Info {
    avatar: string
    courseName: string
    experimentalPlatform: string
    nickname: string
    startTime: string
    class: string
}
interface Props {
    dataList?: Info[]
}
const props = withDefaults(defineProps<Props>(), {
    dataList: () => [],
})


//打开弹窗
function openModal(str: string, obj?: any, i?: number,) {
    if (str === 'exam') {
        window.open('https://www.baidu.com', '_blank');
    } else if (str === 'detail') {
        router.push({
            name: 'courseDetail',
            query: obj
        })
    } else if (str === 'delete') {
        Modal.confirm({
            title: () => '你确定要删掉这个课程吗？',
            icon: () => createVNode(ExclamationCircleOutlined),
            content: () => '此操作不可逆，请谨慎删除！',
            okText: () => '删除',
            okType: 'danger',
            cancelText: () => '取消',
            onOk() {
                deleteCourse({
                    id:obj.id
                })
                    .then((res: any) => {
                        if (res.data.code === 200) {
                            message.success('删除课程成功！')
                        }else{
                            message.error('删除失败')
                        }
                    })
                    .then(() => {
                        emit('refresh')
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

}
</script>
<style lang="scss" scoped></style>

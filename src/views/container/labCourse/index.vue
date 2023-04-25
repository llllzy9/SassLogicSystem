<template>
    <div class="course-container">
        <div class="title-wrap">
            {{ '我学的课：' }}
        </div>
        <div class="content">
            <a-skeleton active :loading="loading" />
            <CardList :dataList="state.dataList" :openModal="openModal" />
        </div>
        <div class="popUps">
            <a-modal v-model:visible="visible" width="1000px">
                <template #title>
                    <div :style="{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '30px',
                            fontSize: '14px'
                        }">
                        <h2>{{ state.popUpsData.course }}</h2>
                        <span>任课老师：{{ state.popUpsData.nickname }}</span>
                        <span>班级：{{ state.popUpsData.class }}</span>
                        <span>开课时间：{{ state.popUpsData.startTime }}</span>
                    </div>
                </template>
                <template #footer>
                    <a-button key="back" @click="handleCancel">取消</a-button>
                </template>
                <myTable :dataSource="state.popUpsData.homeworkList" :columns="state.columns" :openFullModal="openFullModal"></myTable>
            </a-modal>
        </div>
        <div class="full-popUps">
            <a-modal v-model:visible="fullVisible" :title="state.fullPopUps.title" width="100%" wrapClassName="full-modal">
                <div class="top-info" :style="{ ...fullPopStyle }">
                    <a-row>
                        <a-col :span="2"><span>满分：{{ state.fullPopUps.score }}</span></a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <p>作答时间：{{ state.fullPopUps.startTime }} ~ {{ state.fullPopUps.endTime }}</p>
                        </a-col>
                    </a-row>
                </div>
                <div class="topic-content"></div>
                <template #footer>
                    <a-button type="primary" value="large">进入实验</a-button>
                    <a-button value="large">上传提交</a-button>
                </template>
                <!-- <div class="btn-wrap">

            </div> -->
            </a-modal>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CardList from '@/components/CardList/index.vue'
import myTable from '@/components/Table/index.vue'
import { getAllCourse, getHomework, getStudentCourse } from '@/network/course.js'
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const loading = ref<boolean>(false)
loading.value = true
getStudentCourse().then((res: any) => {
    if (res.data.code === 200) {
        console.log(res.data.data)
        state.dataList = res.data.data
        loading.value = false
    } else {
        return Promise.reject(res.data.msg)
    }
}).catch((err: any) => console.log(err))

const state = reactive({
    //课程数据
    dataList: [],
    //表格属性
    columns: [
        {
            title: '名称',
            dataIndex: 'title',
        },
        {
            title: '分数',
            dataIndex: 'score'
        },
        {
            title: '创建时间',
            dataIndex: 'startTime',
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
      },
    ],
    //弹窗数据
    popUpsData: {
        course: '',
        nickname: '',
        class: '',
        startTime: '',
        homeworkList: []
    },
    //大弹窗数据
    fullPopUps: {
        title: '',
        score: '',
        startTime: '',
        endTime:'',
        content:''
    }
})

const fullPopStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    justifyContent: 'space-around',
    height: '10%',
    borderBottom: '2px dashed #eee',
    fontSize: '18px'
}

//打开弹窗
const visible = ref<boolean>(false)
const popIndex = ref<number>(0)
function openModal(obj: any, i: number, str: string) {
    if (str === 'exam') {
        router.push({
            name: 'courseDetail',
            query: obj
        })
    } else if (str === 'detail') {
        router.push({
            name: 'courseDetail',
            query: obj
        })
        // console.log(obj);
        let params = {
            courseId: obj.id
        }
        getHomework(params)
            .then((res: any) => {
                if (res.data.code === 200) {
                    state.popUpsData = obj
                    state.popUpsData.homeworkList = res.data.data
                    visible.value = true
                } else {
                    return Promise.reject(res.data.msg)
                }
            }).catch((err: any) => {
                console.log(err)
            })
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
<template>
    <div class="course-container">
        <div class="content">
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
                        <h2>{{ state.popUpsData.title }}</h2>
                        <span>任课老师：{{ state.popUpsData.teacher }}</span>
                        <span>班级：{{ state.popUpsData.class }}</span>
                        <span>开课时间：{{ state.popUpsData.startTime }}</span>
                    </div>
                </template>
                <template #footer>
                    <a-button key="back" @click="handleCancel">取消</a-button>
                </template>
                <myTable :dataSource="state.dataList[popIndex].dataSource" :columns="state.columns"></myTable>
            </a-modal>
        </div>
        <div class="full-popUps">
            <a-modal v-model:visible="fullVisible" :title="state.fullPopUps.title" width="100%" wrapClassName="full-modal">
                <div class="top-info" :style="{...fullPopStyle}">
                    <a-row>
                        <a-col :span="2"><span>题量：{{ state.fullPopUps.topicVolume }}</span></a-col>
                        <a-col :span="2"><span>满分：{{ state.fullPopUps.grades }}</span></a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24"><p>作答时间：{{ state.fullPopUps.startTime }}</p></a-col>
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
import { getAllCourse } from '@/network/course.js'
import { ref, reactive } from 'vue';
getAllCourse()
    .then((res: any) => {
        console.log(res.data);
    })

const state = reactive({
    //课程数据
    dataList: [
        {
            image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title: '计算机网络',
            teacher: '溪利亚',
            startTime: '2022-01-22',
            class: '计算机科学与技术1907',
            //表格数据
            dataSource: [
                {
                    key: '1',
                    title: '第一章上机作业',
                    createTime: '2023-01-22',
                    tags: ['未完成'],
                    topicVolume: 2,
                    grades: 100,
                    action: [
                        {
                            text: '开始',
                            func: openFullModal
                        }
                    ]
                },
                {
                    key: '2',
                    title: '第七章上机作业',
                    createTime: '2023-02-22',
                    tags: ['未完成'],
                    topicVolume: 2,
                    grades: 100,
                    action: [
                        {
                            text: '开始',
                            func: openFullModal
                        }
                    ]
                },
            ],
        },
        {
            image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title: '数字逻辑',
            teacher: '溪利亚',
            startTime: '2022-01-22',
            class: '计算机科学与技术',
            //表格数据
            dataSource: [
                {
                    key: '1',
                    title: '第三章上机作业',
                    createTime: '2023-01-22',
                    tags: ['未完成'],
                    topicVolume: 2,
                    grades: 100,
                    action: [
                        {
                            text: '开始',
                            func: openFullModal
                        }
                    ]
                },
            ],
        },
        {
            image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title: '单片机',
            teacher: '溪利亚',
            startTime: '2022-01-22',
            class: '计算机科学与1技术',
            //表格数据
            dataSource: [
                {
                    key: '1',
                    title: '第六章上机作业',
                    createTime: '2023-01-22',
                    tags: ['未完成'],
                    topicVolume: 2,
                    grades: 100,
                    action: [
                        {
                            text: '开始',
                            func: openFullModal
                        }
                    ]
                },
            ],
        },
    ],
    //表格属性
    columns: [
        {
            title: '名称',
            dataIndex: 'title',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '状态',
            dataIndex: 'tags',
            slots: { customRender: 'tags' },
        },
        {
            title: '操作',
            dataIndex: 'action',
            slots: { customRender: 'action' },
        },
    ],
    //弹窗数据
    popUpsData: {
        title: '',
        teacher: '',
        class: '',
        startTime: ''
    },
    //大弹窗数据
    fullPopUps: {
        title: '',
        topicVolume: '',
        grades: '',
        startTime: ''
    }
})

const fullPopStyle = {
    display:'flex',
    flexDirection:'column',
    alignItem:'center',
    justifyContent:'space-around',
    height: '10%',
    borderBottom: '2px dashed #eee',
    fontSize:'18px'
}

//打开弹窗
const visible = ref<boolean>(false)
const popIndex = ref<number>(0)
function openModal(obj: any, i: number, str: string) {
    console.log(obj, i, str);
    popIndex.value = i
    state.popUpsData = obj
    visible.value = true
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
}</style>
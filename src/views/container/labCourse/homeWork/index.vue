<template>
        <myTable :loading="data.loading" :dataSource="data.homeWorkList" :columns="state.columns" :openFullModal="openFullModal"></myTable>
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

            </a-modal>
        </div>
</template>

<script lang="ts" setup>
import {reactive,ref} from 'vue'
import myTable from '@/components/Table/index.vue'
interface Props{
    data:object
}
const props = withDefaults(defineProps<Props>(), {
    data:() => {
        return {
            homeWorkList:[]
        }
    }
})

const state = reactive({
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
            title: '完成时间',
            dataIndex: 'startTime',
            slots:{ customRender: 'text' }
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

const fullVisible = ref<boolean>(false)
function openFullModal(obj: any) {
    console.log(obj);
    state.fullPopUps = obj
    fullVisible.value = true
}
</script>
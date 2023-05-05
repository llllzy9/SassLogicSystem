<template>
    <div class="btn-wrap" v-if="userStore.isTeacher">
        <a-button type="primary" @click="assignHomework">布置作业</a-button>
    </div>
    <myTable :dataSource="data.homeWorkList" :columns="state.columns">
    </myTable>
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
            <div class="topic-content">
                <a-row>
                    <h2>系统最高速度计算（最快时钟频率）和流水线设计思想：</h2>

                    同步电路的速度是指同步系统时钟的速度，同步时钟愈快，电路处理数据的时间间隔越短，电路在单位时间内处理的数据量就愈大。假设Tco是触发器的输入数据被时钟打入到触发器到数据到达触发器输出端的延时时间；Tdelay是组合逻辑的延时；Tsetup是Ｄ触发器的建立时间。假设数据已被时钟打入D触发器，那么数据到达第一个触发器的Ｑ输出端需要的延时时间是Tco，经过组合逻辑的延时时间为Tdelay，然后到达第二个触发器的Ｄ端，要希望时钟能在第二个触发器再次被稳定地打入触发器，则时钟的延迟必须大于Tco＋Tdelay＋Tsetup，也就是说最小的时钟周期Tmin
                    =Tco＋Tdelay＋Tsetup，即最快的时钟频率Fmax
                    =1/Tmin。FPGA开发软件也是通过这种方法来计算系统最高运行速度Fmax。因为Tco和Tsetup是由具体的器件工艺决定的，故设计电路时只能改变组合逻辑的延迟时间Tdelay，所以说缩短触发器间组合逻辑的延时时间是提高同步电路速度的关键所在。由于一般同步电路都大于一级锁存，而要使电路稳定工作，时钟周期必须满足最大延时要求。故只有缩短最长延时路径，才能提高电路的工作频率。可以将较大的组合逻辑分解为较小的N块，通过适当的方法平均分配组合逻辑，然后在中间插入触发器，并和原触发器使用相同的时钟，就可以避免在两个触发器之间出现过大的延时，消除速度瓶颈，这样可以提高电路的工作频率。这就是所谓"流水线"技术的基本设计思想，即原设计速度受限部分用一个时钟周期实现，采用流水线技术插入触发器后，可用N个时钟周期实现，因此系统的工作速度可以加快，吞吐量加大。注意，流水线设计会在原数据通路上加入延时，另外硬件面积也会稍有增加。
                </a-row>
                <a-row>
                    <h2>时序约束的概念和基本策略？</h2>

                    时序约束主要包括周期约束，偏移约束，静态时序路径约束三种。通过附加时序约束可以综合布线工具调整映射和布局布线，使设计达到时序要求。

                    附加时序约束的一般策略是先附加全局约束，然后对快速和慢速例外路径附加专门约束。附加全局约束时，首先定义设计的所有时钟，对各时钟域内的同步元件进行分组，对分组附加周期约束，然后对FPGA/CPLD输入输出PAD附加偏移约束、对全组合逻辑的PAD
                    TO PAD路径附加约束。附加专门约束时，首先约束分组之间的路径，然后约束快、慢速例外路径和多周期路径，以及其他特殊路径。
                </a-row>
            </div>
            <template #footer>
                <a-button type="primary" value="large" @click="gotoExam">进入实验</a-button>
                <a-button value="large" @click="submitHomeWork">上传提交</a-button>
            </template>

        </a-modal>
    </div>
    <div class="modal">
        <a-modal v-model:visible="visible" width="600px" title="布置作业">
            <template #footer>
            </template>
            <a-form ref="formRef" :model="state.formState" :rules="rules" :label-col="{ span: 4 }"
                :wrapper-col="{ span: 14 }">
                <a-form-item label="标题" name="title">
                    <a-input v-model:value="state.formState.title" placeholder="请输入标题" />
                </a-form-item>
                <a-form-item label="分值" name="score">
                    <a-input v-model:value="state.formState.score" placeholder="请设置分数" />
                </a-form-item>
                <a-form-item label="时间" name="startTime">
                    <a-space direction="vertical">
                        <a-date-picker v-model:value="state.formState.startTime" :disabled-date="disabledStartDate"
                            show-time format="YYYY-MM-DD HH:mm:ss" placeholder="开始时间" @openChange="handleStartOpenChange" />
                        <a-date-picker v-model:value="state.formState.endTime" :disabled-date="disabledEndDate" show-time
                            format="YYYY-MM-DD HH:mm:ss" placeholder="截至时间" :open="endOpen"
                            @openChange="handleEndOpenChange" />
                    </a-space>
                    <!-- <a-range-picker v-model:value="state.formState.time" style="width: 100%" :format="dateFormat"/> -->
                </a-form-item>
                <a-form-item label="班级" name="clsIds">
                    <a-select v-model:value="state.formState.clsIds" mode="tags" placeholder="请选择参加的班级">
                        <a-select-option value="1">计算机科学与技术1907</a-select-option>
                        <a-select-option value="2">计算机科学与技术1908</a-select-option>
                        <a-select-option value="2">计算机科学与技术1909</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="内容" name="content">
                    <a-textarea v-model:value="state.formState.content" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="formSubmit">提交</a-button>
                    <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
                </a-form-item>
            </a-form>
        </a-modal>

    </div>

    <div>
        <a-modal v-model:visible="subVisible" width="600px" title="提交作业">
            <template #footer>
                <a-button>取消</a-button>
                <a-button type="primary">确定</a-button>
            </template>
            <a-textarea v-model:value="value" placeholder="备注" :rows="4" style="width:100%;margin-bottom: 10px;" />
            <a-upload v-model:file-list="fileList" name="file" :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers" @change="handleChange">
                <a-button>
                    <upload-outlined></upload-outlined>
                    点击上传文件
                </a-button>
            </a-upload>

        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue'
import myTable from '@/components/Table/index.vue'
import { UploadOutlined } from '@ant-design/icons-vue';
import { distributeHomework } from '@/network/course.js'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
interface Props {
    data: object
}
const props = withDefaults(defineProps<Props>(), {
    data: () => {
        return {
            homeWorkList: []
        }
    }
})

const state = reactive({
    columns: [
        {
            title: '课程',
            dataIndex: 'courseName',
        },
        {
            title: '名称',
            dataIndex: 'title',
        },
        {
            title: '分数',
            dataIndex: 'score',
            text: true
        },
        {
            title: '完成时间',
            dataIndex: 'startTime',
            time: true,
            align: 'center'
        },
        {
            title: '状态',
            dataIndex: 'completionStatus',
            tags: true,
        },
        {
            title: '内容描述',
            dataIndex: 'content'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            btns: [
                {
                    label: '开始',
                    func: (obj: any) => openFullModal(obj),
                    type: 'primary',
                    display: !userStore.isTeacher
                },
                {
                    label: '编辑',
                    func: (obj: any) => openFullModal(obj),
                    type: 'primary',
                    display: userStore.isTeacher
                },
                {
                    label: '删除',
                    func: (obj: any) => handleView(obj),
                    type: 'danger',
                    display: userStore.isTeacher
                }
            ]

        }
    ],
    fullPopUps: {
        title: '',
        score: '',
        startTime: '',
        endTime: '',
        content: ''
    },
    formState: {
        title: '',
        time: '',
        startTime: '',
        endTime: '',
        clsIds: [],
        score: '',
        content: ''
    },
})

const fullPopStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    justifyContent: 'space-around',
    height: '10%',
    borderBottom: '2px dashed #eee',
    fontSize: '18px',
    marginBottom: '10px'
}

const fullVisible = ref<boolean>(false)
function openFullModal(obj: any) {
    console.log(obj);
    state.fullPopUps = obj
    fullVisible.value = true
}

function handleDelete(obj: any) {
    console.log(obj);
}

function gotoExam() {
    window.open('http://106.14.20.78:8080/szljTest', '_brank')
}

const rules = {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    startTime: [{ required: true, message: '请选择时间范围', trigger: 'blur' }],
    clsIds: [{ required: true, message: '请选择参加班级', trigger: 'change' }],
    score: [{ required: true, message: '请设置分数', trigger: 'change' }],
    content: [{ required: true, message: '请输入内容', trigger: 'change' }],
};


const endOpen = ref<boolean>(false);
const disabledStartDate = (startTime: any) => {
    if (!startTime || !state.formState.endTime) return false;
    return startTime.valueOf() > state.formState.endTime.valueOf();
};
const disabledEndDate = (endTime: any) => {
    if (!endTime || !state.formState.startTime) return false;
    return state.formState.startTime.valueOf() >= endTime.valueOf();
};
const handleStartOpenChange = (open: boolean) => {
    if (!open) endOpen.value = true
};
const handleEndOpenChange = (open: boolean) => {
    endOpen.value = open;
};

const visible = ref(false)
function assignHomework() {
    visible.value = true
}
const formRef = ref()
const formSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            console.log('values', state.formState, toRaw(state.formState))
            distributeHomework(toRaw(state.formState))
                .then((res: any) => {
                    console.log(res.data)
                })
        })
        .catch((error: any) => {
            console.log('error', error);
        });
}
const resetForm = () => {
    formRef.value.resetFields();
}

const subVisible = ref(false)
const submitHomeWork = () => {
    subVisible.value = true
}
</script>
<style>
.btn-wrap {
    margin-bottom: 10px;
}
</style>
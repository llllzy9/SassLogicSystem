<template>
  <div class="container" v-if="userStore.isStudent">
    <myCarousel></myCarousel>
    <div class="cardbox">
      <a-card title="作业（待完成）" :bordered="true" style="width: 500px">
        <a-list item-layout="horizontal" :data-source="data.homeWorkList">
          <template #renderItem="{ item }">
            <a-list-item>
              <template #actions>
                <a type="primary" @click="handleView(item)">查看</a>
              </template>
              <a-list-item-meta :description="item.content">
                <template #title>
                  <a href="https://www.antdv.com/">{{ item.title }}</a>
                </template>
                <template #avatar>
                  <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-card>
      <a-card title="近期消息" :bordered="true" style="width: 500px">
        <a-list item-layout="horizontal" :data-source="data.messageArr">
          <template #renderItem="{ item }">
            <a-list-item>
              <template #actions>
                <a type="primary" @click="handleView(item)">查看</a>
              </template>
              <a-list-item-meta :description="item.content">
                <template #title>
                  <a href="https://www.antdv.com/">{{ item.theme }}</a>
                </template>
                <template #avatar>
                  <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-card>
    </div>
  </div>
  <div class="container" v-if="userStore.isTeacher">
    <myCarousel></myCarousel>
    <div class="cardbox">
      <a-card title="作业完成情况" :bordered="true" style="width: 500px">
        <a-list item-layout="horizontal" :data-source="data.homeworkStatus">
          <template #renderItem="{ item }">
            <a-list-item>

              <template #extra>
                <p>{{ item.finishedNum }} / {{ item.allNum }}</p>

              </template>
              <a-list-item-meta :description="item.taskName">
                <template #title>
                  <a href="https://www.antdv.com/">{{ item.course }}</a>
                </template>
                <template #avatar>
                  <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </template>

              </a-list-item-meta>

            </a-list-item>
          </template>
        </a-list>
      </a-card>
      <a-card title="备忘录" :bordered="true" style="width: 500px">
        <template #extra><a href="#">添加</a></template>
        <a-list item-layout="horizontal" :data-source="data.note">
          <template #renderItem="{ item }">
            <a-list-item>
              <template #actions>
                <a type="primary" @click="handleView(item)">编辑</a>
                <a type="primary" @click="handleView(item)">删除</a>
              </template>
              <a-list-item-meta :description="item.content">
                <template #title>
                  <a href="https://www.antdv.com/">{{ item.theme }}</a>
                </template>
                <template #avatar>
                  <a-avatar :src="item.img" />
                </template>
              </a-list-item-meta>
              {{ item.content }}
            </a-list-item>
          </template>
        </a-list>
      </a-card>
    </div>
    <div class="chart">
    <myEchart :option="option"/>

    </div>

  </div>
</template>

<script lang="ts" setup>
import myEchart from '@/components/Echarts/index.vue'
import myCarousel from "@/components/Carousel/index.vue"
import { getHomework, getMessage } from '@/network/home.js'
import { ref, reactive, inject } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
const data = reactive({
  //学生
  messageArr: [{
    id: '',
    img: '', //用户头像
    theme: '',
    content: '',
    publishTime: '',
    state: ''
  }],
  homeWorkList: [{
    id: '',
    img: '', //用户头像
    title: '',
    content: '',
    startTime: '',
    endTime: '',
    completionStatus: ''
  }],
  // 老师
  homeworkStatus: [{ //作业完成情况
    id: '',
    img: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', //老师头像
    course: '数字逻辑', //课程名
    taskName: '第三次上机课', //实验名
    finishedNum: '23', //完成作业人数
    allNum: '99', //要完成该作业的总人数
  }],
  note: [{ //备忘录 可编辑可删除可添加
    id: '0',
    img: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', //用户头像
    content: '后天课题结算', //内容 0
  }]
})

const option = {
  title: {
    text: '各个班级完成作业情况'
  },
  xAxis: {
    type: 'category',
    data: ['计科1907', '计科1904', '计科1906', '计应2002', '中软2005']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [20, 10, 15, 8, 7],
      type: 'bar'
    }
  ]
};

const onFinish = () => {
  console.log('finished!');
};
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30
getHomework()
  .then((res: any) => {
    if (res.data.code === 200) {
      data.homeWorkList = res.data.data
    }
  })
getMessage()
  .then((res: any) => {
    if (res.data.code === 200) {
      data.messageArr = res.data.data
    }
  })
function handleView(item:any) {
  console.log('查看', item)
  // 对列表项数据进行对应操作
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: flex-start;
}

.cardbox {
  width: 80%;
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.chart{
  @extend .cardbox
}
</style>
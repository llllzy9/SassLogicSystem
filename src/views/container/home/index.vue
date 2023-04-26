<template>
    <div class="container">
        <myCarousel ></myCarousel>
        <div class="cardbox">
            <a-card title="作业（待完成）" :bordered="true" style="width: 500px">
                <a-list item-layout="horizontal" :data-source="data.homeWorkList">
                  <template #renderItem="{ item }">
                    <a-list-item>
                        <template #actions>
                          <a type="primary" @click="handleView(item)">查看</a>
                        </template>
                      <a-list-item-meta
                        :description="item.content"
                      >
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
                      <a-list-item-meta
                        :description="item.content"
                      >
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
</template>

<script lang="ts" setup>
import myCarousel from "@/components/Carousel/index.vue"
import { getHomework, getMessage } from '@/network/home.js'
import { ref, reactive, inject } from 'vue';

const data =reactive({
        messageArr : [{
            id :'',
            theme: '',
            content :'',
            publishTime : '',
            state :''
        }],
        homeWorkList:[{
            id :'',
            title: '',
            content :'',
            startTime : '',
            endTime :'',
            completionStatus : ''
        }]
})

getHomework()
    .then((res: any) => {
        if(res.data.code === 200){
            data.homeWorkList = res.data.data
        }
    })
getMessage()
    .then((res:any) => {
        if(res.data.code === 200){
            data.messageArr = res.data.data
        }
    })
function handleView (item) {
    console.log('查看', item)
    // 对列表项数据进行对应操作
  }
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    justify-content: flex-start;
}

.cardbox{
    width: 80%;
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
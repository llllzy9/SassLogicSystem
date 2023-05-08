<template>
    <RouterView :data="state" @refresh="getData" />
</template>

<script lang="ts" setup>
import { stdGetMessage,tecGetMessage } from '@/network/course.js'
import {getHomework,getDistributeHomework} from '@/network/homework'
import { ref, reactive,inject, watch} from 'vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
const roles = inject('roles')
const route = useRoute()

const state = reactive({
    homeWorkList: [],
    infoList: [],
    loading:true,
    courseId:route.query.id
})
watch(() => route.query.id,(newValue:any) => {
    state.courseId = newValue
})
const params = ref({
    courseId: route.query.id
})
// 数据请求
async function getData() {
    try {
    const getDataList = roles == 2 ? [getDistributeHomework(), tecGetMessage()] : [getHomework(params), stdGetMessage()]
    const responses = await Promise.allSettled(getDataList.map(request => request))
    const data = responses.map(result => {
      if (result.status === 'fulfilled') {
        const res = result.value
        if (res.data.code === 200) {
          return res.data.data
        } else {
          throw new Error(res.data)
        }
      } else {
        throw new Error(result.reason)
      }
    })
    console.log(data, 'response')
    state.homeWorkList = data[0]
    state.infoList = data[1]
    state.loading = false
    message.success('获取成功')
    return data
  } catch (error) {
    console.error(error)
    message.error('获取失败')
    return null
  }
}
getData()

</script>
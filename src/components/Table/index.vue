<template>
  <a-table :itemColumns="columns" :data-source="dataSource">
    <template v-for="item in columns" :key="item.dataIndex">
      <a-table-column :title="item.title" :data-index="item.dataIndex" :align="item.align">
        <template v-if="item.tags" #default="{ record }">
          <span>
            <a-tag :color="record.completionStatus ? 'green' : 'warning'" v-if="item.tags.done">
              {{ record.completionStatus ? '完成' : '未完成' }}
            </a-tag>
            <a-tag :color="(deadlineTime(record.endTime)) ? 'red' : 'processing'" v-if="item.tags.deadline">
              {{ (deadlineTime(record.endTime)) ? '已截至' : '未截至' }}
            </a-tag>
            <a-tag v-if="item.tags.returnCause" color="warning">
              <a>{{ record.score ? '已批改' : '未批改' }}</a>
            </a-tag>
          </span>
        </template>

        <template v-if="item.text" #default="{ text }">
          <a>{{ text }}</a>
        </template>

        <template v-if="item.time" #default="{ record }">
          <span v-if="item.time === 'ranger'">{{ record.startTime }} ~ {{ record.endTime }}</span>
          <span v-else-if="item.time === 'date'">{{ record[item.dataIndex] }}</span>
        </template>

        <template v-if="item.btns" #default="{ record }">
          <span v-for="btn in item.btns" :key="btn.label">
            <a-button @click="btn.func(record)" :type="btn.type" v-if="btn.display">{{ btn.label }}</a-button>
            <a-divider type="vertical" />
          </span>

          <a-button @click="openModal(record)" :disabled="!record.completionStatus" v-if="roles != 2">下载</a-button>
          <a-button @click="openModal(record)" :disabled="record.files? !(record.files.length >=  1) : true"  
            v-else-if="roles == 2">下载</a-button>
        </template>
      </a-table-column>
    </template>
  </a-table>

  <a-modal v-model:visible="visible" title="完成作业文件列表" :afterClose="afterClose">
    <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="fileList">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a @click="downloadFile(item)">下载</a>
          </template>
          <a-list-item-meta>
            <template #title>
              <a>{{ item }}</a>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <template #footer>
      <a-button @click="handleCancel">取消</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { deadlineTime } from '@/hooks/fication'
import { getSubmitHomework } from '@/network/homework.js';
import { downloadLocal } from '@/network/upload'
import { message } from 'ant-design-vue';
const roles = inject('roles')
interface Props {
  dataSource: Array<any>
  columns: Array<any>
}
const props = withDefaults(defineProps<Props>(), {
})
const homeworkId = ref(0)
const fileList = ref([])
const visible = ref<boolean>(false)
function openModal(record: any) {
  console.log(record);  
  homeworkId.value = record.homeworkId
  visible.value = true
  // getSubmitHomework({
  //   homeworkId: id
  // })
  //   .then((res: any) => {
  //     if (res.data.code === 200) {
  fileList.value = record.files
  //     console.log(fileList.value);
  //   }
  // })
}

function downloadFile(file: any) {
  downloadLocal({
    homeworkId: homeworkId.value,
    filename: file
  })
    .then((res: any) => {
      message.success(res.data.msg)
    })
}

function afterClose() {
  fileList.value = []
}

function handleCancel() {
  visible.value = false
}
</script>
<style lang="scss"></style>
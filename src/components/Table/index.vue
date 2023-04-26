<template>
  <a-table :columns="columns" :data-source="dataSource">
    <template #tags="{ record }">
      <span>
        <a-tag :color="record.completionStatus ? 'green' : 'warning'" v-if="!userStore.isTeacher">
          {{ record.completionStatus ? '完成' : '未完成' }}
        </a-tag>
        <a-tag :color="(formatter(record)) ? 'red' : 'processing'">
          {{ (formatter(record)) ? '已截至' : '未截至' }}
        </a-tag>
      </span>
    </template>
    <template #text="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #time="{ record }">
      <span>{{ record.startTime }} ~ {{ record.endTime }}</span>
    </template>
    <template #operation="{ record }">
      <a-row>
      <a-col :span="5">
        <a-button type="primary" @click="openFullModal(record)">{{userStore.isTeacher? '批改' : '开始'}}</a-button>
      </a-col>
      <a-col :span="6" v-if="userStore.isTeacher" :offset="2">
        <a-button type="danger" @click="handleDelete(record)">删除</a-button>
      </a-col>
    </a-row>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
interface Props {
  dataSource: Array<any>,
  columns: Array<any>,
  openFullModal: (obj: any) => void
}
const props = withDefaults(defineProps<Props>(), {
  dataSource: () => [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ],

  columns: () => [
    {
      dataIndex: 'name',
      key: 'name',
      slots: { title: 'customTitle', customRender: 'name' },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      slots: { customRender: 'tags' },
    },
    {
      title: 'Action',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ],
})

function formatter(record: any) {
  const deadline = new Date(record.endTime).getTime()
  const timeNow = new Date().getTime()
  if (timeNow > deadline) return true
  else return false
}

function handleDelete(record) {
  console.log(record);
  
}
</script>
<template>
  <a-table :itemColumns="columns" :data-source="dataSource">
    <template v-for="item in columns" :key="item.dataIndex">
      <a-table-column :title="item.title" :data-index="item.dataIndex" :align="item.align">
        <template v-if="item.tags" #default="{ record }">
          <span>
            <a-tag :color="record.completionStatus ? 'green' : 'warning'">
              {{ record.completionStatus ? '完成' : '未完成' }}
            </a-tag>
            <a-tag :color="(formatter(record)) ? 'red' : 'processing'">
              {{ (formatter(record)) ? '已截至' : '未截至' }}
            </a-tag>
          </span>
        </template>

        <template v-if="item.text" #default="{ text }">
          <a>{{ text }}</a>
        </template>

        <template v-if="item.time" #default="{ record }">
          <span>{{ record.startTime }} ~ {{ record.endTime }}</span>
        </template>

        <template v-if="item.btns" #default="{ record }">
          
          <span v-for="btn in item.btns" :key="btn.label">

            <a-button @click="btn.func(record)" :type="btn.type">{{ btn.label }}</a-button>
            <a-divider type="vertical" />
          </span>
        </template>

      </a-table-column>
    </template>

    <!-- <template #tags="{ record }">
      <span>
        <a-tag :color="record.completionStatus ? 'green' : 'warning'">
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
      <a-button type="primary" @click="openFullModal(record)" v-if="!userStore.isTeacher">开始</a-button>
      <a-button v-if="userStore.isTeacher" @click="handleView(record)">查看</a-button>
      <a-button type="danger" @click="handleDelete(record)" v-if="userStore.isTeacher">删除</a-button>
    </template> -->
  </a-table>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
interface Props {
  dataSource: Array<any>
  columns: Array<any>
  handleView: (obj: any) => void
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
<style lang="scss"></style>
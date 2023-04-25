<template>
  <a-table :columns="columns" :data-source="dataSource">
    <template #tags="{ record }">
      <span>
        <a-tag :color="record.completionStatus ? 'green' : 'red'">
          {{ record.completionStatus ? '完成' : '未完成' }}
        </a-tag>
      </span>
    </template>
    <template #text="{text}">
    <a>{{ text }}</a>
    </template>
    <template #time="{record}">
      <span>{{ record.startTime }} ~ {{ record.endTime }}</span>
    </template>
    <template #operation="{ record }">
      <a-button type="primary" @click="openFullModal(record)">开始</a-button>
    </template>
  </a-table>
</template>

<script setup lang="ts">

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
</script>
<template>
    <a-table :columns="columns" :data-source="dataSource">
        <template #name="{ text }">
            <a>{{ text }}</a>
        </template>
        <template #tags="{ text: tags }">
            <span>
                <a-tag v-for="tag in tags" :key="tag"
                    :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                    {{ tag.toUpperCase() }}
                </a-tag>
            </span>
        </template>
        <template #action="{ record }">
            <span>
                <a-button type="primary" shape="round">
                    开始
                    <down-outlined />
                </a-button>
            </span>
        </template>
    </a-table>
</template>

<script setup lang="ts">

interface Props {
    dataSource: Array<any>,
    columns: Array<any>,
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
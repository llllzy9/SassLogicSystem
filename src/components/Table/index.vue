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
              <a>{{ record.returnCause ? '已打回' : null }}</a>
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
        </template>

      </a-table-column>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import {deadlineTime} from '@/hooks/fication'
const userStore = useUserStore()
interface Props {
  dataSource: Array<any>
  columns: Array<any>
}
const props = withDefaults(defineProps<Props>(), {

})


</script>
<style lang="scss"></style>
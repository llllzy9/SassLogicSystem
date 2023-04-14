
<template>
    <div ref="main" :style="{ width: '100%', height: '400px' }"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps } from "vue";
//  按需引入 echarts
import * as echarts from "echarts";
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value

const props = defineProps({
    option: {
        type: Object
    }
})

onMounted(
    () => {
        init()
    }
)
function init() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(main.value);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(props.option);
}
</script>

<style scoped></style>


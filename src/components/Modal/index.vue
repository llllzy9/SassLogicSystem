<template>
    <a-modal :visible="visible" width="1000px" title="数字逻辑" @ok="handleOk">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-modal>
</template>

<script setup lang="ts">

interface Props{
    visible:boolean,
    handleOk:() => void
}
const props = withDefaults(defineProps<Props>(), {
    visible:() => false,
    handleOk:() => {}
})


</script>

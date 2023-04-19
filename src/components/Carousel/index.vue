<template>
    <a-carousel :after-change="onChange">
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </a-carousel>
</template>

<script lang="ts" setup>

const onChange = (current: number) => {
      console.log(current);
    };
</script>

<style scoped>

.ant-carousel  {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel {
  color: #fff;
}
</style>
<template>
    <a-carousel :after-change="onChange">
      <a-carousel-slide>
        <img src="your-image-url-1" alt="image-description-1" />
      </a-carousel-slide>
      <a-carousel-slide>
        <img src="your-image-url-2" alt="image-description-2" />
      </a-carousel-slide>
      <a-carousel-slide>
        <img src="your-image-url-3" alt="image-description-3" />
      </a-carousel-slide>
      <a-carousel-slide>
        <img src="your-image-url-4" alt="image-description-4" />
      </a-carousel-slide>
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
  height: 300px;
  width:80%;
  line-height: 300px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel {
  color: #fff;
}
</style>
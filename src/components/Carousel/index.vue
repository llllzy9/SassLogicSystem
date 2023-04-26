<template>
    <a-carousel autoplay>
      <a-carousel-slide>
        <img src="../../assets/1.jpg" alt="image-description-1" />
      </a-carousel-slide>
      <a-carousel-slide>
        <img src="../../assets/2.jpg" alt="image-description-2" />
      </a-carousel-slide>
      <a-carousel-slide>
        <img src="../../assets/3.jpg" alt="image-description-3" />
      </a-carousel-slide>
      <a-carousel-slide>
        <img src="../../assets/4.jpg" alt="image-description-4" />
      </a-carousel-slide>
    </a-carousel>
</template>

<script lang="ts" setup>


</script>

<style scoped>

.ant-carousel  {
  text-align: center;
  height: 350px;
  width:80%;
  line-height: 350px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel {
  color: #fff;
}

img{
  width: 100%;
}
</style>
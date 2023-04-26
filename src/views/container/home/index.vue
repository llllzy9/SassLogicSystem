<template>
    <div class="container">
        <myCarousel ></myCarousel>
        <div class="cardbox">
            <a-card title="Card title" :bordered="true" style="width: 500px">
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </a-card>
            <a-card title="Card title" :bordered="true" style="width: 500px">
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </a-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import myCarousel from "@/components/Carousel/index.vue"

</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    display: grid;
}

.cardbox{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>
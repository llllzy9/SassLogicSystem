<template>
    <div class="container">
        <div class="content">
            <Card v-for="card in 5" style="margin: 16px;" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Card from '@/components/Card/index.vue'
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;

    .form-wrap{
        height: 50px;
        margin-bottom: 20px;
    }
    .content{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
}
</style>
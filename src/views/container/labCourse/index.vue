<template>
    <div class="container">
        <!-- <div class="form-wrap">
            <Form />
        </div> -->
        <div class="content">
            <Card v-for="card in 5" />
        </div>

    </div>
</template>

<script lang="ts" setup>
import Card from '@/components/Content/Card/index.vue'
import Form from '@/components/Content/Form/index.vue'
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;

    .form-wrap{
        height: 100px;
        margin-bottom: 20px;
    }
    .content{
        display: flex;
        justify-content: space-around;
    }
}
</style>
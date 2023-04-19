<template>
    <div class="container">
        <a-form>
            <a-form-item has-feedback label="旧密码" name="pass">
                <a-input type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="新密码" name="checkPass">
                <a-input type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="确认密码" name="checkPass">
                <a-input type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" >保存</a-button>
                <a-button style="margin-left: 10px">重置</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
const useStore = useUserStore()


</script>

<style lang="scss" scoped></style>
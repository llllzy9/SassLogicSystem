<template>
    <div class="container">
        <div class="login-box">
        <div class="login-form">
            <a-form :model="loginForm" v-bind="layout">
                <a-form-item label="用户名">
                    <a-input :value="loginForm.username" placeholder="请输入您的用户名" />
                </a-form-item>
                <a-form-item label="密码">
                    <a-input :value="loginForm.password" placeholder="请输入您的密码" />
                </a-form-item>
                <a-form-item :wrapperCol="{span:4,offset:4}">
                    <a-button type="primary" @click="onSubmit">登录</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
    </div>

</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };

interface FormState {
    username:string
    password:string
}
const loginForm:FormState = reactive({
    username:'',
    password:''
})

const onSubmit = () => {
    router.push({path: '/home'})
}
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box{
    width: 300px;
    height: 200px;
    background-color: aliceblue;
    padding: 20px;
}
}

</style>
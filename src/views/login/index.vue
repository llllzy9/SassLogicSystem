<template>
    <div class="container">
        <div class="login-box">
            <div class="logo">
            
            </div>
            <div class="login-form">
                <div class="form-title">
                    登录
                </div>
                <a-form :model="loginForm" v-bind="layout">

                    <a-form-item calss="user-input">
                        <a-input :value="loginForm.username" placeholder="用户名">
                            <template #prefix>
                                <user-outlined type="user" />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item class="pass-input">
                        <a-input :value="loginForm.password" placeholder="密码">
                            <template #prefix>
                                <LockOutlined />
                            </template></a-input>
                    </a-form-item>

                    <a-form-item class="login-btn">
                        <a-button type="primary" @click="onSubmit">登录</a-button>
                    </a-form-item>

                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { UserOutlined,LockOutlined } from '@ant-design/icons-vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

interface FormState {
    username: string
    password: string
}
const loginForm: FormState = reactive({
    username: '',
    password: ''
})

const onSubmit = () => {
    router.push({ path: '/container' })
}
</script>

<style lang="scss" scoped>
$theme-color:linear-gradient(to right, #4B79A1, #283E51);
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $theme-color;

    .login-box {
        width: 60%;
        height: 60%;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 12px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .logo{
            width: 50%;
            height: 70%;
            background-image: url("@/assets/backgroundImage.jpg");
            background-size: 100% 100%;
            box-shadow: -7px 4px 5px 2px  rgba(178, 178, 178, 0.608);
        }

        .login-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: 35%;
            height: 50%;
            background-color: #ffffff;
            border-radius: 12px;

            .form-title {
                margin-bottom: 30px;
                font-size: 24px;
                font-weight: 600;
                font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            }

            .user-input {
                width: 200px;
                background-color: #16BFFD;
            }

            ::v-deep .ant-btn-primary {
                width: 260px;
                color: #fff;
                height: 40px;
                border-radius: 36px;
                border-color: none !important;
                background: $theme-color;
            }

            ::v-deep .ant-input-affix-wrapper {
                width: 260px;
                height: 40px;
                background-color: #f1f1f1dc;
                border: none !important;
                background-image: none;
                border-radius: 36px;
                .ant-input{
                    background-color: transparent;
                }
            }
        }
    }
}
</style>
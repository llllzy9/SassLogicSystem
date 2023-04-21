<template>
    <div class="container">
        <div class="login-box">
            <div class="logo">
            </div>
            <div class="login-form">
                <div class="form-title">
                    {{ isLogin ? '登录' : '注册' }}
                </div>
                <a-form ref="formRef" :model="state.loginForm" :rules="rules">
                    <a-form-item name="username">
                        <a-input v-model:value="state.loginForm.username" placeholder="请输入用户名">
                            <template #prefix>
                                <user-outlined type="user" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="password">
                        <a-input-password v-model:value="state.loginForm.password" placeholder="请输入密码">
                            <template #prefix>
                                <LockOutlined />
                            </template></a-input-password>
                    </a-form-item>
                    <a-form-item v-if="!isLogin">
                        <a-input v-model:value="state.loginForm.nickName" placeholder="请输入昵称">
                            <template #prefix>
                                <EditOutlined />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item class="login-btn">
                        <a-spin :spinning="spinning" :indicator="indicator">
                            <a-button type="primary" @click="onSubmit">{{ isLogin ? '登录' : '注册' }}
                            </a-button>
                        </a-spin>
                    </a-form-item>
                </a-form>
                <div class="foot-wrap">
                    <a-button type="link" style="color:#aaa" @click="changeStatus">{{ isLogin ? '没有账号？去注册' : '已有账号？去登录'
                    }}</a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { UserOutlined, LockOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { reactive, ref, h } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue';
import { loginRequest, registerRequest } from '../../network/login.js'
import { getUserInfo } from '@/network/user.js'

const router = useRouter()
const userStore = useUserStore()

const formRef = ref()
//表单验证规则
const rules = {
    username: {
        required: true,
        min: 3,
        max: 10,
        message: '用户名长度需为3~10之间',
        trigger: 'blur'
    },
    password: {
        required: true,
        min: 5,
        message: '密码长度最低为5位',
        trigger: 'blur'
    }
};

const indicator = h(LoadingOutlined, {
    style: {
        fontSize: '24px',
    },
    spin: true,
});

interface state {
    loginForm: {
        username: string
        password: string
        nickName?: string
    }
}
const state = reactive<state>({
    loginForm: {
        username: '',
        password: '',
        nickName: ''
    }
})
//提交表单
const spinning = ref<boolean>(false)
function onSubmit() {
    spinning.value = true
    formRef.value.validate()
        .then(() => {
            if (isLogin.value) {
                loginRequest(state.loginForm)
                    .then(async (res: any) => {
                        console.log(res.data);
                        if (res.data.code === 200) {
                            message.success(res.data.msg)
                            sessionStorage.setItem('token', res.data.data.token)
                            userStore.token = res.data.data.token
                            userStore.role = res.data.data.role
                            spinning.value = false
                            //获取用户信息
                            router.push({ path: '/container' })
                        } else {
                            return Promise.reject(res.data.msg)
                        }
                    })
                    .catch((err: any) => {
                        message.error(err)
                        spinning.value = false
                    })
            } else {
                registerRequest(state.loginForm)
                    .then((res: any) => {
                        if (res.data.code === 200) message.success(res.data.msg)
                        else message.error(res.data.msg)
                        spinning.value = false
                    })
            }
        })
        .catch((error: any) => {
            spinning.value = false
            console.log(error);

        })
}

//登陆注册切换
const isLogin = ref<boolean>(true)
function changeStatus() {
    formRef.value.resetFields();
    isLogin.value = !isLogin.value
}
</script>

<style lang="scss" scoped>
$theme-color: linear-gradient(to right, #4B79A1, #283E51);

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

        .logo {
            width: 50%;
            height: 70%;
            background-image: url("@/assets/backgroundImage.jpg");
            background-size: 100% 100%;
            box-shadow: -7px 4px 5px 2px rgba(178, 178, 178, 0.608);
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

                .ant-input {
                    background-color: transparent;
                }
            }
        }
    }
}
</style>
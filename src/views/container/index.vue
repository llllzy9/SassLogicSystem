<template>
    <div class="layout-container">
        <a-layout style="min-height: 100vh">
            <a-layout-sider v-model:collapsed="collapsed" collapsible>
                <div class="logo">
                    <CodeSandboxCircleFilled />{{ collapsed ? 'SASS' : '虚拟实验管控平台' }}
                </div>
                <side-menu />
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="background: #fff; padding: 0">

                    <Head />
                </a-layout-header>
                <a-layout-content style="margin: 0 16px">
                    <a-breadcrumb style="margin: 16px 0">
                        <a-breadcrumb-item>User</a-breadcrumb-item>
                        <a-breadcrumb-item>Bill</a-breadcrumb-item>
                    </a-breadcrumb>
                    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px', height: '93%' }">
                        <RouterView />
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script lang="ts" setup>
import { CodeSandboxCircleFilled } from '@ant-design/icons-vue'
import { getUserInfo } from "@/network/user.js"
import { useUserStore } from '@/stores/user'
import SideMenu from '@/components/SideMenu/index.vue'
import Head from '@/components/Header/index.vue'
import { ref, onMounted } from 'vue';

const userStore = useUserStore()
getUserInfo()
    .then((res: any) => {
        if (res.data.code === 200) {
            Object.assign(userStore.userInfo, res.data.data)
        }
    })
    .catch((err: any) => console.log(err))

const collapsed = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
    color: #f0f2f5;
    font-weight: 600;
    text-align: center;
    line-height: 32px;
    overflow: hidden;

}
</style>
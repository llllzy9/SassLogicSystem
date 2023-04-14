<template>
    <div class="container">
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
                    <content />
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script lang="ts" setup>
import { CodeSandboxCircleFilled } from '@ant-design/icons-vue';
import SideMenu from '@/components/SideMenu/index.vue'
import Content from '@/components/Content/index.vue'
import Head from '@/components/Header/index.vue'

import { ref } from 'vue';

// const collapsed: <boolean> = ref(false)
const collapsed = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
}

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
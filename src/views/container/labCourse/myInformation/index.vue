<template>
    <div class="info-list">
        <a-list item-layout="horizontal" :data-source="data.infoList" :loading="data.loading">
            <template #renderItem="{ item }">

                <a-list-item>
                    <template #actions>
                        <a>删除</a>
                        <a @click="openModal(item)">查看</a>
                    </template>
                    <a-list-item-meta :description="item.content">
                        <template #title>
                            <a-badge dot="true">
                                <a href="https://www.antdv.com/">{{ item.theme }}</a>
                            </a-badge>
                        </template>
                        <template #avatar>
                            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </template>
                    </a-list-item-meta>
                    <div style="color:#aaa">{{ '2023-04-16 14:32' }}</div>
                </a-list-item>

            </template>
        </a-list>
    </div>

    <div class="popUps">
        <a-modal v-model:visible="visible" width="800px" :title="state.popData.theme">
            <template #footer>
                <a-button key="back" @click="handleCancel" type="primary">已读</a-button>
            </template>
            <div style="display: flex;align-items: center;padding-bottom: 10px;">
                <a-avatar :size="40" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span style="margin-left: .5rem;color:#666;margin-right: .5rem;">{{ '溪利亚' }}</span>
                <a-tag color="orange">老师</a-tag>
                <span style="color:#aaa">{{ '2023-04-26 19:14' }}</span>
            </div>
            <div style="margin:15px 45px">
                {{ state.popData.content }}
            </div>

        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
interface Props {
    data: object
}
const props = withDefaults(defineProps<Props>(), {
    data: () => {
        return {

        }
    }
})

const state = reactive({
    popData: {}
})

const visible = ref(false)
const openModal = (obj: any) => {
    state.popData = obj
    visible.value = true
}
const handleCancel = () => {
    visible.value = false;
    console.log('guanbi');
};
</script>
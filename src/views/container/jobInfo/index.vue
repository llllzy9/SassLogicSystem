<template>
    <a-card style="width: 100%" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey"
        @tabChange="key => onTabChange(key, 'noTitleKey')">
        <div v-if="noTitleKey === 'article'">
            <a-list item-layout="horizontal" :data-source="data">
                <template #renderItem="{ item }">
                    <a-list-item>
                        <template #actions>
                            <a @click="handleView(item)">查看</a>
                        </template>
                        <a-list-item-meta :description="item.description">
                            <template #title>
                                <a href="https://www.antdv.com/">{{ item.title }}</a>
                            </template>
                            <!-- <template #avatar>
                                <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </template> -->
                        </a-list-item-meta>
                    </a-list-item>
                </template>
            </a-list>
        </div>
        <div v-else-if="noTitleKey === 'app'">
            <a-list item-layout="horizontal" :data-source="data1">
                <template #renderItem="{ item }">
                    <a-list-item>
                        <template #actions>
                            <a @click="handleView(item)">查看</a>
                        </template>
                        <a-list-item-meta :description="item.description">
                            <template #title>
                                <a href="https://www.antdv.com/">{{ item.title }}</a>
                            </template>
                            <!-- <template #avatar>
                                <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </template> -->
                        </a-list-item-meta>
                    </a-list-item>
                </template>
            </a-list>
        </div>
        <div v-else> <a-list item-layout="horizontal" :data-source="data">
                <template #renderItem="{ item }">
                    <a-list-item>
                        <template #actions>
                            <a>查看</a>
                        </template>
                        <a-list-item-meta :description="item.description">
                            <template #title>
                                <a href="https://www.antdv.com/">{{ item.title }}</a>
                            </template>
                            <!-- <template #avatar>
                                <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </template> -->
                        </a-list-item-meta>
                    </a-list-item>
                </template>
            </a-list></div>
    </a-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const tabList = [
    {
        key: 'tab1',
        // tab: 'tab1',
        slots: { tab: 'customRender' },
    },
    {
        key: 'tab2',
        tab: 'tab2',
    },
];
const contentList = {
    tab1: 'content1',
    tab2: 'content2',
};
const tabListNoTitle = [
    {
        key: 'article',
        tab: '全部',
    },
    {
        key: 'app',
        tab: '未完成',
    },
    {
        key: 'project',
        tab: '已完成',
    },
];

interface DataItem {
    title: string;
    description:string;
};
const data: DataItem[] = [
    {
        title: '数字逻辑1',
        description: '虚拟仿真实验第一章作业  2023-3-25 至 2023-4-30',
    },
    {
        title: '数字逻辑2',
        description: '虚拟仿真实验第二章作业',
    },
    {
        title: '数字逻辑3',
        description: '虚拟仿真实验第三章作业',
    },
    {
        title: '数字逻辑4',
        description: '虚拟仿真实验第四章作业',
    },
];

const data1:DataItem[] = [
    {
        title: '数字逻辑4',
        description: '虚拟仿真实验第一章作业',
    },
    {
        title: '数字逻辑2',
        description: '虚拟仿真实验第二章作业',
    },
    {
        title: '数字逻辑3',
        description: '虚拟仿真实验第三章作业',
    },
    {
        title: '数字逻辑4',
        description: '虚拟仿真实验第四章作业',
    },
]
const key = ref('tab1'); 
const noTitleKey = ref('article');

const onTabChange = (value: string, type: string) => {
    console.log(value, type);
    if (type === 'key') {
        key.value = value;
    } else if (type === 'noTitleKey') {
        noTitleKey.value = value;
    }
};

const handleView = (item) => {
    console.log('viewing', item)
    // do something when "View" link is clicked
}
</script>

<style lang="scss" scoped></style>
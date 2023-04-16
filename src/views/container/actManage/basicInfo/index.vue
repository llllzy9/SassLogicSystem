<template>
    <a-form>
        <a-form-item label="姓名">
            <a-input />
        </a-form-item>
        <a-form-item label="学号">
            <a-input />
        </a-form-item>
        <a-form-item label="班级">
            <a-select placeholder="please select your zone">
                <a-select-option value="shanghai">计算机科学与技术1907</a-select-option>
                <a-select-option value="beijing">物联网工程1901</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="性别">
            <a-radio-group :value="value">
                <a-radio :value="1">男</a-radio>
                <a-radio :value="2">女</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item label="手机号">
            <a-input />
        </a-form-item>
        <a-form-item label="学校">
            <a-input />
        </a-form-item>
        <a-form-item label="备注">
            <a-input type="textarea" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary">保存</a-button>
            <a-button style="margin-left: 10px">重置</a-button>
        </a-form-item>
    </a-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref<number>(1);

</script>
<template>

    <a-form layout="inline">
        <a-col :span="4">
        <a-form-item label="科目">
            <a-input>
            </a-input>
        </a-form-item>
    </a-col>
    <a-col :span="4">
        <a-form-item label="教师名">
            <a-input>
            </a-input>
        </a-form-item>
    </a-col>
    <a-col :span="4">
        <a-form-item label="开课时间">
            <a-range-picker />
        </a-form-item>
    </a-col>
    <a-col :span="4">
        <a-form-item label="班级">
            <a-input>
            </a-input>
        </a-form-item>
    </a-col>
    <a-col :span="8">
        <a-form-item>
            <a-button type="primary" html-type="submit">
                搜索
            </a-button>
        </a-form-item>
        <a-form-item>
            <a-button type="" html-type="submit">
                重置
            </a-button>
        </a-form-item>
    </a-col>
       
    </a-form>
</template>

<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
// import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { reactive } from 'vue';
</script>
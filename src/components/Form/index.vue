<template>
    <div class="my-form">
    <a-form
    ref="formRef"
    :rules="formRules"
    >
        <a-row wrap="true">
            <template v-for="item in formItem" :key="item.label">
                <a-col>
                    <a-form-item :label="item.label" :name="item.name">
                        <template v-if="item.type === 'input' || item.type === 'password'">
                            <a-input :placeholder="item.placeholder" v-model:value="formData[`${item.field}`]">
                            </a-input>
                        </template>
                        <template v-eles-if="item.type === 'select'">

                            <a-select :placeholder="item.placeholder" v-model:value="formData[`${item.field}`]">
                                <a-option v-for="option in item.options" :key="option.value" :value="option.value">{{
                                    option.title }}</a-option>
                            </a-select>
                        </template>
                        <template v-eles-if="item.type === 'datepicker'">
                            <a-range-picker v-model="formData[`${item.field}`]">
                            </a-range-picker>
                        </template>
                        <template v-eles-if="item.type === 'upload'">
                            <a-upload
                            v-model:file-list="formData[`${item.field}`]"
                            >

                            </a-upload>
                        </template>
                    </a-form-item>
                </a-col>
            </template>
        </a-row>
    </a-form>
    <div class="footer">
        <slot name="footer"></slot>
    </div>
</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

type IForrmType = 'input' | 'password' | 'select' | 'datepicker' | 'upload'

interface IFormItem {
    field: string
    type: IForrmType
    label: string
    placeholder?: any
    options?: any[]
    name?:string
    otherOptions?:any
}

interface Props {
    formData: Record<string, any>
    formItem: Array
    formRules:object
}
const props = withDefaults(defineProps<Props>(), {})
</script>
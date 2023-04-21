<template>
    <div class="container">
        <a-form name="custom-validation" ref="formRef" :model="formState" :rules="rules" v-bind="layout"
            @finish="handleFinish" @finishFailed="handleFinishFailed" style="width:500px">
            <a-form-item has-feedback label="旧密码" name="oldpass">
                <a-input v-model:value="formState.oldpass" type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="新密码" name="newpass">
                <a-input v-model:value="formState.newpass" type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="确认密码" name="checkPass">
                <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" html-type="submit">提交</a-button>
                <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import type { UnwrapRef } from 'vue'
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import { changePassword } from '@/network/user.js'
import type { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { message } from 'ant-design-vue';
const useStore = useUserStore()

interface FormState {
    oldpass: string;
    checkPass: string;
    newpass: string
}

const formRef = ref();
const formState: UnwrapRef<FormState> = reactive({
    oldpass: '',
    newpass: '',
    checkPass: '',
});
let validatePass = async (rule: RuleObject, value: string) => {
    if (value === '') {
        return Promise.reject('请输入新密码');
    } else if (value.length < 5) {
        return Promise.reject("密码长度最小为6位");
    }
    else {
        if (formState.checkPass !== '') {
            formRef.value.validateFields('checkPass');
        }
        return Promise.resolve();
    }
};
let validatePass2 = async (rule: RuleObject, value: string) => {
    if (value === '') {
        return Promise.reject('请重新输入新密码');
    } else if (value !== formState.newpass) {
        return Promise.reject("两次输入不一致！");
    }
    else {
        return Promise.resolve();
    }
};

const rules = {
    oldpass: [{ required: true, message:'请输入旧密码', trigger: 'change' }],
    newpass: [{ required: true, validator: validatePass, trigger: 'change' }],
    checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }],
};
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};
const handleFinish = (values: FormState) => {
    console.log(values, formState);
    let data = {
        oldPassword:values.oldpass,
        newPassword:values.newpass
    }
    changePassword(data)
    .then((res:any) => {
        if(res.data.code === 200) {
            message.success(res.data.msg)
        }
    })
};
//失败回调
const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
    console.log(errors);
};
const resetForm = () => {
    formRef.value.resetFields();
};

</script>

<style lang="scss" scoped></style>
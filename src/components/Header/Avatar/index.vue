<template>
    <a-avatar size="large">
      <template #icon><UserOutlined /></template>
    </a-avatar>
  </template>
  <script lang="ts">
  import { UserOutlined } from '@ant-design/icons-vue';
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: {
      UserOutlined,
    },
  });
  </script>
  
  
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import {use} from "echarts/core"


import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import '@/assets/main.css'
// import ECharts from 'vue-echarts'  
// import "echarts";  

const app = createApp(App)

app.use(createPinia()).use(router).use(Antd)

app.mount('#app')



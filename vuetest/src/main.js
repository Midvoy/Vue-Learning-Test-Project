import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'                           
import 'element-plus/dist/index.css'
//import './mock/index.js'                

const pinia =createPinia()

createApp(App).use(Antd).use(pinia).use(store).use(router).use(ElementPlus).mount('#app')

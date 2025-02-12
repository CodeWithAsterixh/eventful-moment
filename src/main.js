import './assets/main.css'
import 'vue3-toastify/dist/index.css';


import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import { router } from './router'
import Vue3Toastify from 'vue3-toastify'

// variables
const app = createApp(App)
const pinia = createPinia()


// plugins
app.use(pinia)
app.use(router)
app.use(Vue3Toastify,{
    autoClose: 3000,
    // ...
  })


// mounter
app.mount('#app')

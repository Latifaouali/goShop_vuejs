import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js';
import store from '@/store/index'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
//import 'bootstrap/dist/js/bootstrap.bundle'

createApp(App)
.use(router)
.use(store)
.mount('#app');

import { createApp } from 'vue'
import store from './store/store'
import App from './App.vue'
import 'pretendard/dist/web/static/pretendard.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/css/reset.css'
import './assets/css/main.css'
import router from './router'


createApp(App).use(store).use(router).mount('#app')

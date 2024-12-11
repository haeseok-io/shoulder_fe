import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Moim from './components/Moim.vue'
import User from './components/User.vue'
import Register from './components/Register.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/auth/login', component: Login},
    {path: '/moim', component: Moim},
    {path: '/user', component: User},
    {path: '/auth/register', component: Register},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
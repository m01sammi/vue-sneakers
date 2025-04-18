import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import Drawer from './components/Drawer.vue'
import Favorities from './pages/Favorities.vue'

const app = createApp(App)

const routes = [
    { path: '/', name: 'Home', component:Home },
    { path: '/drawer', name: 'Drawer', component: Drawer},
    { path: '/favorities', name: 'Favorities', component: Favorities}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
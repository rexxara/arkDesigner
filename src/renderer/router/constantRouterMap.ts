import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    { path: '/:pathMatch(.*)*', component: () => import("@renderer/views/404.vue") },
    { path: '/', name: 'main', component: () => import('@renderer/main/index.vue') },
    { path: '/LandingPage', name: '总览', component: () => import('@renderer/components/LandingPage.vue') },
    { path: '/Print', name: '打印', component: () => import('@renderer/views/Print.vue') },
]

export default routes
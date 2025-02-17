import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import HomeView from '@/views/Home.vue'
import AdminView from '@/views/Admin.vue'
import AdminLoginView from '@/views/AdminLogin.vue'
import axios from "axios";


const routes: Array<RouteRecordRaw> = [
    { path: '/', component: HomeView },
    { path: '/login', component: AdminLoginView },
    { path: '/admin', component: AdminView, meta: { requiresAuth: true, } },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            const response = await axios.get('/api/users/authorize-admin', { withCredentials: true });
            if (to.path === '/admin' && response.data.role === 'admin') {
                to.meta.isAdmin = true;
                next();
            } else if (to.path === '/admin' && response.data !== 'admin') {
                next('/');
            } else {
                next();
            }
        } catch (err) {
            next('/login')
        }
    } else {
        next();
    }
});

export default router;
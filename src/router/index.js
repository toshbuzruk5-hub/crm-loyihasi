import { createRouter, createWebHistory } from 'vue-router'

import UsersView from '../views/UsersView.vue'
import CompaniesView from '../views/CompaniesView.vue'
import CurstomersView from '../views/CurstomersView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
    {
        path: '/',
        redirect: '/users'
    },
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/users',
        component: UsersView
    },
    {
        path: '/companies',
        component: CompaniesView
    },
    {
        path: '/customers',
        component: CurstomersView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (to.path === '/login' && isLoggedIn) {
        next('/users');
    } else if (to.path !== '/login' && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router
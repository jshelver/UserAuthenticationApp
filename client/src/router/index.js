import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  	history: createWebHistory(import.meta.env.BASE_URL),
  	routes: [
    	{
            path: '/',
            name: 'Home',
            component: () => import('../views/HomeView.vue')
        },
    	{
            path: '/login',
            name: 'Login',
            component: () => import('../views/auth/LoginView.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('../views/auth/RegisterView.vue')
        },
        {
            path: '/user',
            name: 'User',
            component: () => import('../views/auth/UserView.vue')
        }
  	]	
})

export default router
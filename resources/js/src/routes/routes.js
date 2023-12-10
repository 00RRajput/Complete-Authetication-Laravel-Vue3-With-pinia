// import VueRouter from 'vue-router';
// import {useAuthStore} from './src/store/Module/auth.js';
import Cookies from 'js-cookie';
import { useAuthStore } from "../store/auth";
import { useRouter, createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/Dashboard.vue";
import Dashboard from "../pages/Dashboard.vue";
import About from "../components/about.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

const routes = [
    {
        path: "/register",
        component: Register,
        name: "Register",
    },
    {
        path: "/login",
        component: Login,
        name: "Login",
    },
    {
        path: "/",
        component: Layout,
        children: [
            {
                path: "/my-dash",
                component: Dashboard,
                name: "Dashboard",
            },
            {
                path: "/about",
                component: About,
                name: "about",
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore(); 
  
    try {
        const res = await authStore.getUser();
  
        if (authStore.isAuthenticated) {
            if (to.name === "Login" || to.name === "Register") next({ name: "Dashboard" });
            else next();
        } else {
            if (to.name === "Login" || to.name === "Register") next();
            else next('/login');
        }
    } catch (error) {
        console.error('Error occurred during authentication:', error);
        next('/login'); // Redirect to login page in case of an error
    }
  });

export default router;

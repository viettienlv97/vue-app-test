import {createRouter, createWebHistory} from 'vue-router'

import Step_1 from '../components/Step_1.vue'
import Step_2 from '../components/Step_2.vue'
import Step_3 from '../components/Step_3.vue'
import Step_4 from '../components/Step_4.vue'

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Step_1
    },
    {
        path: '/step1',
        name: 'Step 1',
        component: Step_1
    },
    {
        path: '/step2',
        name: 'Step 2',
        component: Step_2
    },
    {
        path: '/step3',
        name: 'Step 3',
        component: Step_3
    },
    {
        path: '/step4',
        name: 'Step 4',
        component: Step_4
    },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: "active"
});

export default router
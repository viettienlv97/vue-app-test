import {createRouter, createWebHistory} from 'vue-router'
import store from '../store/index.js'

import Step_1 from '../components/Step_1.vue'
import Step_2 from '../components/Step_2.vue'
import Step_3 from '../components/Step_3.vue'
import Step_4 from '../components/Step_4.vue'

export const routes = [
    {
        path: '/',
        name: 'Step 1',
        component: Step_1
    },
    {
        path: '/step2',
        name: 'Step 2',
        component: Step_2,
        beforeEnter: (to, from, next) => beforeEnter(next, 'validated-step-1')
    },
    {
        path: '/step3',
        name: 'Step 3',
        component: Step_3,
        beforeEnter: (to, from, next) => beforeEnter(next, 'validated-step-2')
    },
    {
        path: '/step4',
        name: 'Step 4',
        component: Step_4,
        beforeEnter: (to, from, next) => beforeEnter(next, 'validated-step-3')
    },
]

const beforeEnter = (next, validated) => {
    let step = localStorage.getItem(validated)
    if (step) {
        next()
    } else {
        next('/')
    }
}

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: "active"
});

export default router
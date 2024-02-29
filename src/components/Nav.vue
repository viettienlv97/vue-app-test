<script setup>
import {ref} from 'vue'
import {routes} from '../routes/index.js'

const pathRoutes = routes.filter(route => route.path !== '/')
const props = defineProps(['currentRoute'])

const emit = defineEmits('toPreviousRoute', 'toNextRoute')

function goPrevious() {
    let index = pathRoutes.indexOf(pathRoutes.find((route) => route.path === props.currentRoute))

    emit('toPreviousRoute', pathRoutes[index - 1].path)
}
function goNext() {
    let index = pathRoutes.indexOf(pathRoutes.find((route) => route.path === props.currentRoute))

    emit('toNextRoute', pathRoutes[index + 1].path)
}
</script>

<template>
    <div class="nav-wrapper d-flex justify-content-between">
        <div>
            <div v-if="currentRoute !== '/step1'"
                class="nav-btn"
                @click="goPrevious"
            >Previous
            </div>
        </div>
        <div>
            <div  v-if="currentRoute !== '/step4'"
                class="nav-btn"
                @click="goNext"
            >Next</div>
        </div>
    </div>
</template>

<style scoped>
    .nav-btn{
        border: 2px solid black;
    }
</style>
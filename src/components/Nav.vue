<script setup>
import {ref} from 'vue'
import {routes} from '../routes/index.js'

const props = defineProps(['currentRoute'])

const emit = defineEmits('toPreviousRoute', 'toNextRoute', 'submit')

function goPrevious() {
    let index = routes.indexOf(routes.find((route) => route.path === props.currentRoute))
    emit('toPreviousRoute', routes[index - 1].path)
}
function goNext() {
    let index = routes.indexOf(routes.find((route) => route.path === props.currentRoute))

    emit('toNextRoute', routes[index + 1].path)
}
</script>

<template>
    <div class="nav-wrapper d-flex justify-content-between">
        <div>
            <div v-if="currentRoute !== '/'"
                class="box box-hover box-border"
                @click="goPrevious"
            >Previous
            </div>
        </div>
        <div>
            <div  v-if="currentRoute !== '/step4'"
                class="box box-hover box-border"
                @click="goNext"
            >Next</div>
            <div v-else
                class="box box-hover box-border"
                @click="emit('submit')"
            >Submit
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
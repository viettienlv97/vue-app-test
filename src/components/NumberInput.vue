<script setup>
import {ref} from 'vue'

const props = defineProps([
    'title',
    'invalid',
    'invalidTitle',
    'number',
    'minValue',
    'maxValue'
])

const count = ref(props.number || props.minValue)
const emit = defineEmits('addNumber')

function addDish(increse = true) {
    if (increse) {
        count.value >= props.maxValue ? count.value : count.value++
    } else {
        count.value <= props.minValue ? count.value : count.value--
    }
    emit('addNumber', count)
}
</script>

<template>
    <div class="input-number">
        <div>{{ title }}</div>
        <div class="input-wrapper box-border d-flex justify-content-between">
            <span class="input-n">{{ count }}</span>
            <div class="input-btn d-flex flex-column">
                <svg @click="addDish()"
                    class="rotate i-btn" width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M7 10l5 5 5-5"></path> </g> </g></svg>
                <svg @click="addDish(false)"
                    class="i-btn" width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M7 10l5 5 5-5"></path> </g> </g></svg>
            </div>
        </div>
        <div v-if="invalid" class="small">{{ invalidTitle }}</div>
    </div>
</template>

<style scoped>
    .input-n {
        height: 1.5rem;
        width: 8rem;
        text-align: right;
        padding-right: 0.5rem;
        border: none;
        margin: auto;
    }
    .input-n:focus {
        border: none;
    }
    .input-wrapper{
        width: 10rem;
    }
    .input-btn {
        border-left: 2px solid black;
        padding: 0 0.1rem;
    }
    .i-btn:hover
     {
        background-color: rgb(214, 214, 214);
    }
    .rotate {
        transform: rotate(180deg);
    }
    .input-n{
        width: 11rem;
    }
    
</style>
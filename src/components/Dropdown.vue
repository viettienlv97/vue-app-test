<script setup>
import {ref} from 'vue'

const emit = defineEmits(['chooseItem'])

const showDropdown = ref(false)

const props = defineProps([
    'title',
    'invalid',
    'selectedItem',
    'options'
])

function chooseItem(item) {
    emit('chooseItem', item)
}
</script>

<template>
    <div class="dd">
        <div>
            {{ title }}
        </div>
        <button class="dd-btn box-border" @click="showDropdown = !showDropdown">
            <span class="dd-btn-label">
                {{props.selectedItem || '---'}}
            </span>
            <svg :class="{
                'rotate': showDropdown
            }" width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M7 10l5 5 5-5"></path> </g> </g></svg>
        </button>
        <div v-if="invalid" class="small">* Please select</div>
        <div v-if="showDropdown" class="dd-menu box-border position-absolute">
            <div v-for="(item, index) in props.options" :key="index"
                class="dd-item" 
                @click="chooseItem(item); showDropdown = false"
            >
                {{ item }}
            </div>
        </div>
    </div>
</template>

<style scoped>
    .dd-btn{
        width: 12rem;
        display: flex;
        height: 2rem;
        box-shadow: none;
    }
    .dd-btn-label{
        flex: 1;
        height: 100%;
        padding: 0 0.5rem;
        border-right: 2px solid black;
        text-align: left;
    }
    .dd-menu {
        margin-top: 1rem;
        background-color: #ffffff;
        width: 11rem;
        z-index: 1;
    }
    .dd-item {
        padding: 0.2rem;
    }
    .dd-item:hover {
        background-color: rgb(214, 214, 214);
    }
</style>
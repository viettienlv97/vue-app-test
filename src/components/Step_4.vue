<script setup>
import {ref} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

import Nav from './Nav.vue'

const route = useRoute()
const store = useStore()

const changePath = (path) => {
    store.state.changePath(path)
}
</script>

<template>
    <div class="step-wrapper">
        <div class="wrapper">
            
        </div>
        <Nav 
            :currentRoute="route.path"
            @toPreviousRoute="changePath"
            @toNextRoute="changePath"
        />
    </div>
</template>

<style scoped>
    
</style>
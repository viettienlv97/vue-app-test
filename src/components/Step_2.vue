<script setup>
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

import Dropdown from './Dropdown.vue';
import Nav from './Nav.vue'
import {dishes} from '../constants.js'

const store = useStore()
const route = useRoute()

const selectedRestaurant = ref(null)
const nextStep = ref(false)

let choosenMeal = store.state.selectedMeal
let restaurants = []

dishes.forEach((dish) => {
    let mealServe = dish.availableMeals?.find((meal) => meal === choosenMeal)
    if (mealServe) {
        restaurants.push(dish.restaurant)
    }
})
restaurants = new Set(...[restaurants])

onMounted(() => {
    if (store.state?.restaurant) selectedRestaurant.value = store.state?.restaurant
})

const chooseRestaurant = (restaurant) => {
    selectedRestaurant.value = restaurant
    store.dispatch('selectRestaurant', restaurant)
}

const validateData = () => {
    if (!selectedRestaurant.value) return false
    return true
}

// const changePath = (path, isGoNext = false) => {
//     if (isGoNext && !validateData()) return

//     if (isGoNext)  localStorage.setItem('validated-step-2', 1)
//     // go next or go previous
//     store.state.changePath(path)
// }

const goNext = (path) => {
    nextStep.value = true

    if (!validateData()) return

    localStorage.setItem('validated-step-2', 1)

    // go next or go previous
    store.state.changePath(path)
}
const goPrevious = (path) => {
    // go next or go previous
    store.state.changePath(path)
}

</script>

<template>
    <div class="step-wrapper d-flex flex-column justify-content-between">
        <div class="wrapper">
            <Dropdown
                :title="'Please Select a Restaurant'"
                :invalid="nextStep && !selectedRestaurant"
                :selectedItem="selectedRestaurant"
                :options="restaurants"
                @chooseItem="chooseRestaurant"
            />
        </div>
        <Nav 
            :currentRoute="route.path"
            @toPreviousRoute="goPrevious"
            @toNextRoute="(path) => goNext(path)"
        />
    </div>
</template>

<style scoped>
    .wrapper {
        margin-left: 5rem;
    }
</style>
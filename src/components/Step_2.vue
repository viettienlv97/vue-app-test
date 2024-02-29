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
let choosenMeal = 'lunch'
let restaurants = []

dishes.forEach((dish) => {
    let mealServe = dish.availableMeals?.find((meal) => meal === choosenMeal)
    if (mealServe) {
        restaurants.push(dish.restaurant)
    }
})
restaurants = new Set(...[restaurants])
console.log(restaurants)
onMounted(() => {
    if (store.state?.restaurant) selectedRestaurant.value = store.state?.restaurant
})

const chooseRestaurant = (restaurant) => {
    selectedRestaurant.value = restaurant
    store.dispatch('selectRestaurant', restaurant)
}

const changePath = (path) => {
    store.state.changePath(path)
}
</script>

<template>
    <div class="step-wrapper d-flex flex-column justify-content-between">
        <div class="wrapper">
            <Dropdown
                :title="'Please Select a Restaurant'"
                :selectedItem="selectedRestaurant"
                :options="restaurants"
                @chooseItem="chooseRestaurant"
            />
        </div>
        <Nav 
            :currentRoute="route.path"
            @toPreviousRoute="changePath"
            @toNextRoute="changePath"
        />
    </div>
</template>

<style scoped>
    .wrapper {
        margin-left: 5rem;
    }
</style>
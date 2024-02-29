<script setup>
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import { dishes as totalDishes} from '../constants';

import Dropdown from './Dropdown.vue';
import NumberInput from './NumberInput.vue'
import Nav from './Nav.vue'

const store = useStore()
const route = useRoute()

const selectedDish = ref([])
const selectedDishes = ref([])

const selectedMeal = store.state?.selectedMeal
const selectedRestaurant = store.state?.restaurant

let restaurantServingDishes = totalDishes.filter(dish => 
    dish.restaurant === selectedRestaurant && dish.availableMeals.find(meal => meal === selectedMeal)
)

const dishes = ref(restaurantServingDishes.map(dish => dish.name))
const total = dishes.value.length
function addDish() {
    if (selectedDishes.value.length !== dishes.length) {
        selectedDishes.value.push({
        name: '',
        numberOfDishes: 1
    })
    }
}

function chooseDish(dish, item, index) {
    if (index === 0) {
        selectedDishes.value[0].name = item
    }

    dish.name = item
    dishes.value = dishes.value.filter(d => d !== item)

}

function addNumber(dish, number, index) {
    dish.numberOfDishes = number
}

const changePath = (path) => {
    store.state.changePath(path)
}

onMounted(() => {

    addDish()
})
</script>

<template>
    <div class="step-wrapper">
        <div class="wrapper">
            <div v-for="(dish, index) in selectedDishes">
                <div class="d-flex justify-content-between">
                    <Dropdown
                        :title="'Please Select a Dish'"
                        :selectedItem="dish.name"
                        :options="dishes"
                        @chooseItem="(item) => chooseDish(dish, item, index)"
                    />
                    <NumberInput
                        :title="'Please Enter Number of people'"
                        :minValue="1"
                        :maxValue="10"
                        @addNumber="(number) => addNumber(dish, number, index)"
                    />
                    {{ dish }}
                </div>
            </div>
            <button v-if="selectedDishes.length !== total" @click="addDish()">+</button>
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
    }
</style>
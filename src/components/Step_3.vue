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

console.log(restaurantServingDishes);

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
    dish.numberOfDishes = number.value
}

const addDishes = async () => {
    if (!selectedDishes.value.length) return false

    let totalNumberOfDishes = 0
    selectedDishes.value.forEach((dish) => {
        if (!dish.name || !dish.numberOfDishes) return false

        totalNumberOfDishes += dish.numberOfDishes
    })

    if (totalNumberOfDishes < store.state.numberOfPeople) return false

    await store.dispatch('addDishes', selectedDishes.value)
    return true
}

const changePath = async (path, isGoNext = false) => {
    if (isGoNext) {
        if (! await addDishes()) {
            return 
        }
    }

    if (isGoNext)  localStorage.setItem('validated-step-3', 1)

    store.state.changePath(path)
}

onMounted(() => {
    if (store.state.selectedDishes.length) {
        selectedDishes.value = store.state.selectedDishes
        let selected = selectedDishes.value.map(d => d.name)

        dishes.value = dishes.value.filter(d => !selected.includes(d));
    } else {
        addDish()
    }
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
                        :title="'Please enter no. of servings'"
                        :minValue="1"
                        :maxValue="10"
                        @addNumber="(number) => addNumber(dish, number, index)"
                    />
                </div>
            </div>
            <button class="btn-add mt" v-if="selectedDishes.length !== total" @click="addDish()">+</button>
        </div>
        <Nav 
            :currentRoute="route.path"
            @toPreviousRoute="changePath"
            @toNextRoute="(path) => changePath(path, true)"
        />
    </div>
</template>

<style scoped>
    .wrapper {
    min-height: 300px;
    }
    .mt {
        margin-top: 3rem;
    }
    .btn-add{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        box-shadow: none;
        border: 3px solid black;
        background-color: gray;
        font-weight: bold;
    }
    .btn-add:hover{
        opacity: 0.6;
    }
</style>
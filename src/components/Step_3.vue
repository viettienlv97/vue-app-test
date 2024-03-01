<script setup>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import { dishes as totalDishes} from '../constants';

import Dropdown from './Dropdown.vue';
import NumberInput from './NumberInput.vue'
import Nav from './Nav.vue'

const store = useStore()
const route = useRoute()

const selectedDish = ref([])
const selectedDishes = ref(store.state?.selectedDishes || [])
const nextStep = ref(false)
//const totalNumberOfDishes = ref(0)

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
        name: null,
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

    let invalidName = false
    selectedDishes.value.forEach((dish) => {
        let dishName = dish.name
        if (!dishName || dishName === '') {
            invalidName = true
        }

        //totalNumberOfDishes.value += dish.numberOfDishes
    })
    if (invalidName) return false

    if (totalNumberOfDishes.value < store.state.numberOfPeople) return false
    await store.dispatch('addDishes', selectedDishes.value)
    return true
}

const goNext = async (path) => {
    nextStep.value = true

    let isAddDishes = await addDishes()
    if (!isAddDishes) return

    localStorage.setItem('validated-step-3', 1)
    store.state.changePath(path)
}

const goPrevious = (path) => {
    store.state.changePath(path)
}

const totalNumberOfDishes = computed(() => {
    let total = 0
    selectedDishes.value.forEach((dish) => {
        total += dish.numberOfDishes
    })
    return total
})

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
                        :invalid="nextStep && !dish.name"
                        :selectedItem="dish.name"
                        :options="dishes"
                        @chooseItem="(item) => chooseDish(dish, item, index)"
                    />
                    <NumberInput
                        :title="'Please enter no. of servings'"
                        :invalid="nextStep && (totalNumberOfDishes < store.state.numberOfPeople)"
                        :invalid-title="'* Number of dishes should be greater or equal to the number of people'"
                        :number="dish.numberOfDishes"
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
            @toPreviousRoute="goPrevious"
            @toNextRoute="(path) => goNext(path)"
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
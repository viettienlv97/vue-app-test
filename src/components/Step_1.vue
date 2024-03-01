<script setup>
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

import Dropdown from './Dropdown.vue';
import NumberInput from './NumberInput.vue';
import Nav from './Nav.vue'

const store = useStore()
const route = useRoute()

const selectedMeal = ref(null)
const numberOfPeople = ref(store.state?.numberOfPeople || 1)
const nextStep = ref(false)

const meals = ['breakfast', 'lunch', 'dinner']

const selectMeal = (meal) => {
    selectedMeal.value = meal
    store.dispatch('selectMeal', meal)
}
const addNumber = (number) => {
    numberOfPeople.value = number.value
    store.dispatch('addPeople', number.value)
}

const validateData = () => {
    if (!selectedMeal.value) return false
    return true
}

const goNext = (path) => {
    nextStep.value = true

    if (!validateData()) return

    localStorage.setItem('validated-step-1', 1)

    // go next or go previous
    store.state.changePath(path)
}
const goPrevious = (path) => {
    // go next or go previous
    store.state.changePath(path)
}

onMounted(() => {
    localStorage.clear()
    selectedMeal.value = store.state?.selectedMeal || null
})
</script>

<template>
    <div class="step-wrapper d-flex flex-column justify-content-between">
        <div class="wrapper">
            <Dropdown
                :title="'Please select a meals'"
                :invalid="nextStep && !selectedMeal"
                :selectedItem="selectedMeal"
                :options="meals"
                @chooseItem="selectMeal"
            />
            <NumberInput
                :title="'Please Enter Number of people'"
                :number="numberOfPeople"
                :minValue="1"
                :maxValue="10"
                @addNumber="addNumber"
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
    .dropdown, .input-n{
        width: 11rem;
    }
    .dropdown-btn{
        display: flex;
        width: 100%;
        height: 2rem;
        box-shadow: none;
    }
    .rotate {
        transform: rotate(180deg);
    }
    .dropdown-btn-label{
        flex: 1;
        height: 100%;
        padding: 0 0.5rem;
        border-right: 2px solid black;
        text-align: left;
    }
    .dropdown-menu {
        margin-top: 1rem;
        border: 2px solid black;
    }
    .dropdown-item {
        padding: 0.2rem;
    }
    .dropdown-item:hover,
    .i-btn:hover
     {
        background-color: rgb(214, 214, 214);
    }

    .input-number {
        margin-top: 2rem;
    }
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
        border: 2px solid black;
    }
    .input-btn {
        border-left: 2px solid black;
        padding: 0 0.1rem;
    }
    
</style>
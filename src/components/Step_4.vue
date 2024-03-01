<script setup>
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

import Nav from './Nav.vue'

const allData = ref({})

const route = useRoute()
const store = useStore()

const changePath = (path) => {
    store.state.changePath(path)
}

const submit = () => {
    const {
        selectedMeal,
        numberOfPeople,
        restaurant,
        selectedDishes
    } = allData.value

    console.log(`Meal: ${selectedMeal}`);
    console.log(`No. of People: ${numberOfPeople}`);
    console.log(`Restaurant: ${restaurant}`);
    console.log('Dishes:');
    selectedDishes.forEach(dish => {
        console.log(`${dish.name} - ${dish.numberOfDishes}`);
    })
}

onMounted(() => {
    let state = store.state
    allData.value = {
        ...state
    }
})
</script>

<template>
    <div class="step-wrapper">
        <div class="wrapper">
            <div class="d-flex justify-content-between">
                <div>Meal</div>
                <div class="detail">{{ allData.selectedMeal }}</div>
            </div>
            <div class="d-flex justify-content-between mt">
                <div>No. of People</div>
                <div class="detail">{{ allData.numberOfPeople }}</div>
            </div>
            <div class="d-flex justify-content-between mt">
                <div>Restaurant</div>
                <div class="detail">{{ allData.restaurant }}</div>
            </div>
            <div class="d-flex justify-content-between mt">
                <div>Dishes</div>
                <div class="dishes-wrapper box-border detail">
                    <div v-for="(dish ,index) in allData.selectedDishes" :key="index">
                        <span>{{ dish.name }} - {{ dish.numberOfDishes }}</span>
                    </div>
                </div>
            </div>
        </div>
        <Nav 
            :currentRoute="route.path"
            @toPreviousRoute="changePath"
            @submit="submit"
        />
    </div>
</template>

<style scoped>
    .wrapper {
        margin-left: 10rem;
        width: 25rem;
        min-height: 300px;
    }
    .mt{
        margin-top: 1rem;
    }
    .dishes-wrapper {
        padding: 0.5rem 1rem 1rem 0.5rem;
    }
    .detail {
        width: 15rem;
    }
</style>
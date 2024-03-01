const mutations = {
    selectMeal(state, selectedMeal) {
        state.selectedMeal = selectedMeal
    },
    addPeople(state, totalPeoples) {
        state.numberOfPeople = totalPeoples
    },
    selectRestaurant(state, restaurant) {
        state.restaurant = restaurant
    },
    addDishes(state, selectedDishes) {
        state.selectedDishes = selectedDishes
    },
    addChangePath(state, changePath) {
        state.changePath = changePath
    },
    isChecked(state) {
        state.isChecked = true
    }
}

export default mutations
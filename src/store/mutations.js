const mutations = {
    selectMeal(state, selectedMeal) {
        console.log(selectedMeal);
        state.selectedMeal = selectedMeal
    },
    addPeople(state, totalPeoples) {
        console.log(totalPeoples);
        state.numberOfPeople = totalPeoples
    },
    selectRestaurant(state, restaurant) {
        state.restaurant = restaurant
    },
    addChangePath(state, changePath) {
        state.changePath = changePath
    },
    setPath(state, currentPath) {
        console.log((currentPath));
        state.currentPath = currentPath
    },
    isChecked(state) {
        state.isChecked = true
    }
}

export default mutations
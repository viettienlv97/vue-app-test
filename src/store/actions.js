const actions = {
    selectMeal({commit}, selectedMeal) {
        commit('selectMeal', selectedMeal)
        commit('selectRestaurant', null)
    },
    addPeople({commit}, totalPeoples) {
        commit('addPeople', totalPeoples)
    },
    selectRestaurant({commit}, restaurant) {
        commit('selectRestaurant', restaurant)
        commit('addDishes', [])
    },
    addDishes({commit}, selectedDishes) {
        commit('addDishes', selectedDishes)
    },
    addChangePath({commit}, changePath) {
        commit('addChangePath', changePath)
    },
    isChecked({commit}) {
        commit('isChecked')
    }
}

export default actions
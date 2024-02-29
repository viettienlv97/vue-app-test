const actions = {
    selectMeal({commit}, selectedMeal) {
        commit('selectMeal', selectedMeal)
    },
    addPeople({commit}, totalPeoples) {
        commit('addPeople', totalPeoples)
    },
    selectRestaurant({commit}, restaurant) {
        commit('selectRestaurant', restaurant)
    },
    setPath({commit}, currentPath) {
        commit('setPath', currentPath)
    },
    addChangePath({commit}, changePath) {
        commit('addChangePath', changePath)
    },
    isChecked({commit}) {
        commit('isChecked')
    }
}

export default actions
import { createStore } from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'

const store = createStore({
    state() {
        return {
            selectedMeal: null,
            numberOfPeople: 0,
            restaurant: null,
            selectedDishes: [],
            changePath: null
        }
    },
    actions: {
        ...actions
    },
    mutations: {
        ...mutations
    }
})

export default store
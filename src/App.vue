<script setup>
import {ref, onMounted, watch} from 'vue'

import {useStore} from 'vuex'
import { routes } from "./routes/index";
import {useRouter} from 'vue-router'

//import Nav from "./components/Nav.vue";

const store = useStore()
const router = useRouter()
const pathRoutes = routes.filter(route => route.path !== '/')
const paths = pathRoutes.map(route => route.path)
const currentRoute = ref('/step1')

const changePath = (path) => {
  router.push(path)
  currentRoute.value = path
}

//store.dispatch('addChangePath', changePath)

const toPreviousRoute = (path) => {
  changePath(path)
}

const toNextRoute = (path) => {
  if(canGoNext(path)) changePath(path)
}

const canGoNext = (path) => {
  console.log(paths);
  if (!path || !paths.includes(path)) return false

  if (paths[0] === path && checkStep1()) return true
  if (paths[1] === path && checkStep2()) return true
  return false
}

const checkStep1 = async () => {
  if (!store.state?.selectedMeal || !store.state?.numberOfPeople) {
    await store.dispatch('isChecked')
    return false
  }
  return true
}

const checkStep2 = async () => {
  if (!store.state?.restaurant) return false
  await store.dispatch('isChecked')

  return true
}

onMounted(() => {
  store.dispatch('setPath', currentRoute.value)
  store.dispatch('addChangePath', changePath)
})
</script>

<template>
  <div class="navigation">
    <button
      v-for="(route, index) in pathRoutes"
      :key="index"
      @click="changePath(route.path)"
      :class="{
        'is-focus': route.path == currentRoute
      }"
    >
      {{ route.name }}
    </button>
  </div>
  <router-view />
  <!-- <Nav 
    :currentRoute="currentRoute"
    @toPreviousRoute="toPreviousRoute"
    @toNextRoute="toNextRoute"
  /> -->

  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.navigation {
  margin-bottom: 6rem;
}
.is-focus {
  background-color: rgb(0, 170, 192);
}
</style>

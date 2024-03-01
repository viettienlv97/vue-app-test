<script setup>
import {ref, onMounted, watch} from 'vue'

import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

import { routes } from "./routes/index";

const store = useStore()
const router = useRouter()
const currentRoute = ref('/')

const changePath = (path) => {
  router.push(path)
  currentRoute.value = path
}

onMounted(() => {
  store.dispatch('addChangePath', changePath)
})
</script>

<template>
  <div class="navigation d-flex">
    <div class="box box-border mr"
      v-for="(route, index) in routes"
      :key="index"
      :class="{
        'is-focus': route.path == currentRoute
      }"
    >
      {{ route.name }}
    </div>
  </div>
  <router-view />
</template>

<style scoped>
  .navigation {
    margin-bottom: 6rem;
  }
  .mr{
    margin-right: 1px;
  }
  .is-focus {
    background-color: rgb(0, 170, 192);
  }
</style>

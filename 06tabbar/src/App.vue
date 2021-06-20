<template>
  <div id="app">
    <router-view></router-view>
    <MainTabBar/>
  </div>
</template>

<script>
  import MainTabBar from './components/mainTabbar/MainTabBar.vue'

  export default {
    name: 'App',
    components: {
      MainTabBar,
    }
  }
</script>


<style>
  @import "./assets/css/base.css";
</style>


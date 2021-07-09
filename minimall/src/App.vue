<template>
  <div id="app">
    <!--keep-alive 排除 Detail 组件-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <MainTabBar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'

  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>

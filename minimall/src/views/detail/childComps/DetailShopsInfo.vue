<template>
  <div class="shop-info">
    <div class="shop-top">
      <img src="shops.logo" alt="" v-if="shops.logo"/>
      <span class="title">{{ shops.name }}</span>
    </div>
    <div class="shop-middel"></div>
    <div class="shop-bottom"></div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopsInfo",
    data() {
      return {
        
      }
    },
    props: {
      shops: {
        type: Object,
        default() {
          return {};
        }
      }
    },
  }
</script>

<style scoped>
</style>
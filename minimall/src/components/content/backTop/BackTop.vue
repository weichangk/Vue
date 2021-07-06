<template>
  <div class="backTop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .backTop {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }

  .backTop img {
    width: 43px;
    height: 43px;
  }
</style>
<template>
  <div>
    <h2 class="title">{{ msg }}</h2>
    <button @click="btnClick">按钮</button>
    <h3>{{ name }}</h3>
    <Cpn></Cpn>
  </div>
</template>

<script>
import Cpn from "./Cpn.vue";
export default {
  name: "App",
  data() {
    return {
      msg: "hello webpack plugin 配置",
      name: "weichangk",
    };
  },
  methods: {
    btnClick() {
      console.log("...");
    },
  },
  components: {
    Cpn,
  },
};
</script>

<style scoped>
.title {
  color: green;
}
</style>
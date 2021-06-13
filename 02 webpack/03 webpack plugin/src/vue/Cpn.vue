<template>
  <p class="cpnmsg">{{ msg }}</p>
</template>
<script>
export default {
  name: "Cpn",
  data() {
    return {
      msg: "我是Cpn组件的msg",
    };
  },
};
</script>

<style scoped>
.cpnmsg {
  color: red;
}
</style>
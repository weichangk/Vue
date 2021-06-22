<template>
  <div id="Vuex1">
    <h1>{{msg}}</h1>
    <button @click="add">+</button>
    <button @click="sub">-</button>
  </div>
</template>

<script>
  export default{
    name: "Vuex1",
    data() {
      return {
        msg: "hello Vuex1"
      }
    },
    methods: {
      // 通过 this.$store.commit 注册 Vuex.Store.mutations 中的事件 通过 mutations 中的事件方法来修改 Vuex.Store.state 中的数据。
      add() {
        this.$store.commit('increment')
      },
      sub() {
        this.$store.commit('decrement')
      }
    }
  }
</script>

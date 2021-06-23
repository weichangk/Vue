<template>
  <div id="app">
    <h1>{{msg}}</h1>
    <!-- 通过 $store.state 直接修改 state 中的对象，不建议这样搞 -->
    <button @click="$store.state.counter++">+</button>
    <button @click="$store.state.counter--">-</button>
    <hr>
    <Vuex1></Vuex1>
    <hr>

    <p>Vuex.Store.state.counter: {{$store.state.counter}}</p>
    <p>App computed getMore30PriceBook: {{getMore30PriceBook}}</p>
    <p>Vuex.store.getters getMore40PriceBook: {{$store.getters.getMore40PriceBook}}</p>
    <p>Vuex.store.getters getMore40PriceBookLength: {{$store.getters.getMore40PriceBookLength}}</p>
    <p>Vuex.store.getters getBookByPrice(10): {{$store.getters.getBookByPrice(10)}}</p>
    <p>Vuex.Store.state.admin: {{$store.state.admin}}</p>
  </div>
</template>

<script>
import Vuex1 from './views/Vuex1.vue'

export default {
  name: 'App',
  data() {
    return {
      msg: "hello Vuex 案例"
    }
  },
  components: {
    Vuex1,
  },
  computed: {
    getMore30PriceBook() {
      // 在 vue 组件中通过计算属性直接访问 store.state 对象。
      // 如果其他组件也要这样访问的话，其他组件也要写这样的计算属性。这时就可以通过 Vuex.store.getters 就可以进行统一的封装了。

      // return this.$store.state.books.filter(function (value) {
      //   return value.price > 30;
      // })    

      // return this.$store.state.books.filter(p => {
      //   return p.price > 30;
      // })  

      return this.$store.state.books.filter(p => p.price > 30)     
    }
  }
}
</script>

<style>

</style>

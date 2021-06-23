<template>
  <div id="Vuex1">
    <h1>{{msg}}</h1>
    <button @click="add">+</button>
    <button @click="sub">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="pushBook">pushBook</button>
    <button @click="pushBookAndincrementCount">pushBookAndincrementCount</button>
    <button @click="PayloadCommit">PayloadCommit</button>
    <button @click="updateAdminAttribute">updateAdminAttribute</button>
    <button @click="updateAdminAttributeResponse">updateAdminAttributeResponse</button>
    <button @click="deleteAdminAttribute">deleteAdminAttribute</button>
    <button @click="deleteAdminAttributeResponse">deleteAdminAttributeResponse</button>
    <button @click="actionUpdateAdminAge">actionUpdateAdminAge</button>
  </div>
</template>

<script>
  import {
    PAYLOADCOMMIT
  } from '../store/mutations-type.js'

  export default{
    name: "Vuex1",
    data() {
      return {
        msg: "hello Vuex1",
        book: {
          id: 100,
          name: 'Vuex1',
          price: 1000,
        }
      }
    },
    methods: {
      // 通过 this.$store.commit 注册 Vuex.Store.mutations 中的事件 通过 mutations 中的事件方法来修改 Vuex.Store.state 中的数据。
      add() {
        this.$store.commit('increment')
      },
      sub() {
        this.$store.commit('decrement')
      },
      addCount(count) {
        // 注册 Vuex.Store.mutations 中的事件 并传一个参数
        this.$store.commit('incrementCount', count)
      },
      pushBook() {
        // 注册 Vuex.Store.mutations 中的事件 并传一个对象参数
        this.$store.commit('pushBook', this.book)
      },
      pushBookAndincrementCount() {
        this.$store.commit('pushBookAndincrementCount', this.book, '10')
      },
      // 参数被称为是mutation的载荷(Payload)
      // 如果参数不是一个呢而是很多个。可以在注册 mutation 事件的方法中可以传入一个对象，包含type指定事件类型，和多个参数，在 mutation 事件中对载荷（Payload）对象取出相关参数。
      PayloadCommit() {
        this.$store.commit({
          type: PAYLOADCOMMIT,// 使用Mutation常量类型
          book: this.book,
          count: this.book.id,
        })
      },
      updateAdminAttribute() {
        this.$store.commit({
          type: 'updateAdminAttribute',         
        })
      },
      updateAdminAttributeResponse() {
        this.$store.commit('updateAdminAttributeResponse')
      },
      deleteAdminAttribute() {
        this.$store.commit({
          type: 'deleteAdminAttribute',         
        })
      },
      deleteAdminAttributeResponse() {
        this.$store.commit('deleteAdminAttributeResponse')
      },

      // 使用 action 对 mutations 进行异步操作。Action 通过 store.dispatch 方法触发。支持与 Mutation 同样的载荷方式和对象方式进行传参。
      actionUpdateAdminAge() {
        this.$store.dispatch({
          type: 'actionUpdateAdminAge',
          age: 10,
        })
      }
    }
  }
</script>

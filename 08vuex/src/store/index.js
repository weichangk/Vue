import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Vuex.Store 应用程序开发的状态管理模式
export default new Vuex.Store({
  // 存放数据的地方。
  // 单一状态树 
  state: {
    counter: 0,
    books: [
      { id: 1, name: 'html', price: 10 },
      { id: 2, name: 'css', price: 20 },
      { id: 3, name: 'javascript', price: 30 },
      { id: 4, name: 'jquery', price: 40 },
      { id: 5, name: 'vue', price: 50 },
    ]
  },
  // 修改数据的地方。
  // 修改 Vuex.store.state 的方法是提交 mutation。Vuex.store.mutation 非常类似于事件，外部组件调用该事件需要通过this.$store.commit注册。
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    }
  },
  // 访问数据的地方。
  // 组件对 Vuex.store.state 公共访问的地方。
  getters: {
    getMore40PriceBook(state) {
      return state.books.filter(p => {
        return p.price > 40;
      })
    },
    // getters 可以做参数
    getMore40PriceBookLength(state, getters) {
      return getters.getMore40PriceBook.length;
    },

    // getters 加参数，调用时传入
    // 参数需要在内部返回的function中添加
    getBookByPrice(state) {
      // return function (price) {
      //   return state.books.filter(p => {
      //     return p.price > price;
      //   })

      // return price => {
      //   return state.books.filter(p => {
      //     return p.price > price;
      //   })
      // }

      return price => { return state.books.filter(p => p.price > price) }
    },
  },
  actions: {
  },
  modules: {
  }
})

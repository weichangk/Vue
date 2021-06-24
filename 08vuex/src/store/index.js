import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {
  PAYLOADCOMMIT
} from '../store/mutations-type.js'

const moduleA = {
  state: {
    name: 'moduleA state'
  },
  mutations: {},
  getters: {},
  actions: {},
}
const moduleB = {
  state: {
    name: 'moduleB state'
  },
  mutations: {},
  getters: {},
  actions: {},
}
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
    ],
    admin: {
      name: 'weichangk',
      age: 25,
    }
  },
  // 修改数据的地方。
  // 修改 Vuex.store.state 的方法是提交 mutation。Vuex.store.mutation 非常类似于事件，外部组件调用该事件需要通过this.$store.commit注册。
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    // mutation 方法传一个参数
    incrementCount(state, count) {
      state.counter += count;
    },
    // mutation 方法传一个参数,该参数可以是一个对象
    pushBook(state, b) {
      state.books.push(b);
    },

    // 传两个参数有问题！！！ 不应该这样传参，应该通过载荷(Payload)对象封装参数
    pushBookAndincrementCount(state, book, count) {
      state.counter += count;
      state.books.push(book);
    },
    // 通过载荷(Payload)对象，实现传入多个参数。
    // 使用Mutation常量类型
    [PAYLOADCOMMIT](state, payload) {
      state.counter += payload.count;
      state.books.push(payload.book);
    },
    // 给admin对象添加新属性，但这样添加的属性不具有响应式
    updateAdminAttribute(state) {
      state.admin['adrr'] = "深圳xxx"
    },
    // 给admin对象添加新的响应式属性
    updateAdminAttributeResponse(state) {
      Vue.set(state.admin, 'adrr', '深圳xxx');// 存在的属性将不会再添加
    },
    // 删除属性，不具有响应式
    deleteAdminAttribute(state) {
      delete state.admin.age;
    },
    // 删除属性，具有响应式
    deleteAdminAttributeResponse(state) {
      Vue.delete(state.admin, 'age');
    },
    // 注意：如果使用了不具有响应式的方法添加或删除属性，再使用具有响应式的方法添加或删除属性（与不具有响应式的方法添加或删除相同的属性），
    // 将不会具有响应式，因为重复的添加或删除无效，内存中已经有数据了，其他响应式操作刷新页面时将会重新刷新显示之前使用了不具有响应式的方法添加或删除属性。

    updateAdminAge(state, payload) {
      state.admin.age += payload.age;
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
    // 使用 action 对 mutations 进行异步操作
    actionUpdateAdminAge(context, payload) {
      setTimeout(() => {
        context.commit('updateAdminAge', payload);
      }, 1000)
    },

    // 使用 action 对 mutations 进行异步操作 并回调。Action返回Promise 
    actionA(context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('updateAdminAge', payload);
          resolve('actionA updateAdminAge success');
        }, 2000)
      })
    },

  },

  // Vuex 允许将 Vuex.store 分割成模块（module）
  modules: {
    a: moduleA,
    b: moduleB
  }
})

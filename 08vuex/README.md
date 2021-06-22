# 08vuex

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

----
### Vuex
- 官网 https://vuex.vuejs.org/zh/
- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
- 它采用 集中式存储管理 应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
- Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
- 通俗来将就是应用程序中的所有全局变量，对所有变量进行管理，并对外提供对变量状态管理的接口。

### Vuex核心概念
- Vuex状态管理模式图 https://vuex.vuejs.org/vuex.png

#### State
- 存放数据的地方。
- Vuex.store.state 单一状态树。用一个对象就包含了全部的应用层级状态。每个应用将仅仅包含一个 store 实例。

#### Getters
- 访问数据的地方。
- 有时候需要从 Vuex.store.state 的对象中派生出一些状态，供组件公共访问。
- Vuex 允许在 store 中定义 “getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
- Getters可以作为参数和传递参数。

#### Mutation
- 修改数据的地方。
- 修改 Vuex.store.state 对象中的状态的方法是提交 mutation。Vuex.store.mutation 中的方法非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。
- 提交载荷（Payload）可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）。

#### Action

#### Module
- Vuex 允许将 Vuex.store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块


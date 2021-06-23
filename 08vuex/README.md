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
- 提交载荷（Payload）可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）。注册 mutation 事件的方法中可以传入一个对象，包含type指定事件类型，和多个参数。在 mutation 事件中对载荷（Payload）对象取出相关参数。

#### Action
- Action类似于Mutation, 但是是用来代替Mutation进行异步操作的
- 通常情况下, Vuex要求我们Mutation中的方法必须是同步方法。当我们使用devtools时, 可以devtools可以帮助我们捕捉mutation的快照，但是如果是异步操作, 那么devtools将不能很好的追踪这个操作什么时候会被完成。
- Action 通过 store.dispatch 方法触发 this.$store.dispatch()
- Actions 支持与 Mutation 同样的载荷方式和对象方式进行传参。

#### Module
- Vuex 允许将 Vuex.store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

### Mutation响应规则
- Vuex的store中的state是响应式的, 当state中的数据发生改变时, Vue组件会自动更新
- 这就要求我们必须遵守一些Vuex对应的规则
  - 提前在store中初始化好所需的属性
  - 如果要添加或删除属性并且具有响应式需要使用 如：Vue.set(state.admin, 'adrr', '深圳xxx'); Vue.delete(state.admin, 'adrr')

### Mutation常量类型 
- 在mutation中, 定义了很多事件类型(也就是其中的方法名称)
- 当项目增大时, Vuex管理的状态越来越多, 需要更新状态的情况越来越多, 那么意味着Mutation中的方法越来越多。方法过多, 使用者需要花费大量的经历去记住这些方法, 甚至是多个文件间来回切换
- 为了避免Mutation中的方法越来越多的问题，在各种Flux实现中, 一种很常见的方案就是使用常量替代Mutation事件的类型，可以将这些常量放在一个单独的文件中, 方便管理以及让整个app所有的事件类型一目了然。可以创建一个文件: mutation-types.js, 并且在其中定义我们的常量，定义常量时, 我们可以使用ES2015中的风格, 使用一个常量来作为Mutation事件的类型，提供给组件中的方法commit注册，以[Mutation常量]来命名事件，使得Mutation事件和注册事件的方法中的事件类型 (type)得到统一。


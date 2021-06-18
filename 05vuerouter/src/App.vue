<template>
  <div id="app">
    <div id="nav">
      <!-- router-link标签是一个vue-router中已经内置的组件, 没有设置tag属性时它会被默认渲染成一个 a 标签 -->
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <!-- 动态路由拼接 -->
      <router-link :to="/user/ + userId">User</router-link> |
      <router-link to="/lazyTest">LazyTest</router-link> |
      <router-link to="/routequeryTest">RoutequeryTest</router-link> |
      <!-- query传递参数方式一: router-link -->
      <router-link :to="{path: '/routequeryTest', query: {name: 'weichangk', age: 25}}" tag='button'>query传递参数方式一</router-link> |
      <!-- query传递参数方式二: JavaScript -->
      <button @click='toRoutequeryTest'>query传递参数方式二</button>
    </div>

    <!-- router-view标签会根据当前的路径, 动态渲染出不同的组件。在路由切换时, 切换的是router-view挂载的组件, 其他内容不会发生改变。 -->
    <!-- keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染 -->
    <keep-alive exclude='About,LazyTest'>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userId: "zhangsan",
    };
  },
  methods: {
    toRoutequeryTest() {
      this.$router.push({
        path: '/routequeryTest',
        query: {
          name: 'weick',
          age: 18,
        }
      })
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

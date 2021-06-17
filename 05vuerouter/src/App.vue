<template>
  <div id="app">
    <div id="nav">
      <!-- router-link标签是一个vue-router中已经内置的组件, 没有设置tag属性时它会被默认渲染成一个 a 标签 -->
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <!-- 动态路由拼接 -->
      <router-link :to="/user/ + userId">User</router-link> |
      <router-link to="/lazyTest">LazyTest</router-link>
    </div>

    <!-- router-view标签会根据当前的路径, 动态渲染出不同的组件。在路由切换时, 切换的是router-view挂载的组件, 其他内容不会发生改变。 -->
    <router-view />
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

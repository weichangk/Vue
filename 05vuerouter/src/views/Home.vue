<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <router-link to="/home/homeNews">HomeNews</router-link> |
    <router-link to="/home/homeMsgs">HomeMsgs</router-link>
    <keep-alive include="HomeNews">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      path: "/home/homeMsgs",
    };
  },
  // 在实例创建完成后被立即调用
  created() {
    console.log("home created");
    this.$router.push(this.path);
  },
  // 实例销毁后调用
  destroyed() {
    console.log("home destroyed");
  },
  // 被 keep-alive 缓存的组件激活时调用
  activated() {
    console.log("home activated");
    this.$router.push(this.path);
  },
  // 被 keep-alive 缓存的组件停用时调用。
  deactivated() {
    console.log("home deactivated");
  },
  // 导航离开该组件的对应路由时调用
  beforeRouteLeave(to, from, next) {
    console.log("home beforeRouteLeave");
    this.path = this.$route.path;
    next();
  },
};
</script>

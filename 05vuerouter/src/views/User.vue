<template>
  <div class="User">
    <h1>This is an User page</h1>
    <h2>User Id is {{ $route.params.userId }}</h2>
    <h2>routeName is {{ routeName }}</h2>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      msg: "This is an User page",
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    }
  }
};
</script>

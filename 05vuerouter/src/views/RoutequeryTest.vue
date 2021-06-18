<template>
  <div class="RoutequeryTest">
    <h1>This is an route-query test page</h1>
    <!-- 获取参数 -->
    <h2>{{$route.query.name}}</h2>
    <h2>{{$route.query.age}}</h2>
  </div>
</template>

<script>
export default {
  name: "RoutequeryTest",
};
</script>

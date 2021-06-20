<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="green">
      <template v-slot:item-icon>  
        <img src="../../assets/img/tabbar/home.svg" alt="">
      </template>
      <template v-slot:item-icon-active>  
        <img src="../../assets/img/tabbar/home_active.svg" alt="">
      </template>
      <template v-slot:item-text>  
        <div>首页</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/category">
      <template v-slot:item-icon>  
        <img slot="item-icon" src="../../assets/img/tabbar/category.svg" alt="">
      </template>
      <template v-slot:item-icon-active>  
        <img slot="item-icon" src="../../assets/img/tabbar/category_active.svg" alt="">
      </template>
      <template v-slot:item-text>  
        <div slot="item-text">分类</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/shopcart">
      <template v-slot:item-icon>  
        <img slot="item-icon" src="../../assets/img/tabbar/shopcart.svg" alt="">
      </template>
      <template v-slot:item-icon-active>  
        <img slot="item-icon" src="../../assets/img/tabbar/shopcart_active.svg" alt="">
      </template>
      <template v-slot:item-text>  
        <div slot="item-text">购物车</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/profile">
      <template v-slot:item-icon>  
        <img slot="item-icon" src="../../assets/img/tabbar/profile.svg" alt="">
      </template>
      <template v-slot:item-icon-active>  
        <img slot="item-icon" src="../../assets/img/tabbar/profile_active.svg" alt="">
      </template>
      <template v-slot:item-text>  
        <div slot="item-text">我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>


<script>
  import TabBar from '../tabbar/TabBar.vue'
  import TabBarItem from '../tabbar/TabBarItem.vue'

  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<!-- vue 2.6.0 之后插槽的样式不能在生命插槽的组件中设置！！！要在使用插槽的组件中传入！！！-->
<style>
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
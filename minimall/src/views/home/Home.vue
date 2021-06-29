<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <SwiperView :banners="banners"></SwiperView>
    <RecommendView :recommends="recommends"></RecommendView>
    <FeatureView/>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata} from 'network/home'
  import SwiperView from './childComps/SwiperView'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        recommends: [],
      }
    },
    components: {
      NavBar,
      SwiperView,
      RecommendView,
      FeatureView,
    },
    created() {
      getHomeMultidata().then((result) => {
        this.banners = result.data.banner.list;
        this.recommends = result.data.recommend.list;
      }).catch((err) => {        
      });
    }
  }
</script>

<style scoped>

  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0; 
    top: 0;
    z-index: 9;
  }
</style>
<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <Swiper>
      <SwiperItem v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata} from 'network/home'
  import {Swiper, SwiperItem} from 'components/common/swiper'
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
      Swiper,
      SwiperItem,
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
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

  }
</style>
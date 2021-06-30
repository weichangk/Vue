<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <SwiperView :banners="banners"></SwiperView>
    <RecommendView :recommends="recommends"></RecommendView>
    <FeatureView/>
    <TabControl :titles="['流行', '新款', '精选']" class="tab-control"></TabControl>
    <GoodsList :goods="goods['pop'].list"></GoodsList>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import SwiperView from './childComps/SwiperView'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  export default {
    name: 'Home',
    data() {
      return {
        //轮播图数据
        banners: [],
        //推荐信息数据
        recommends: [],
        //商品数据
        goods: {
          'pop': {page: 0, list: []},//流行
          'new': {page: 0, list: []},//新款
          'sell': {page: 0, list: []},//精选
        }
      }
    },
    components: {
      NavBar,
      SwiperView,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
    },
    created() {
      this.getHomeMultidata();

      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');


    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then((result) => {
          this.banners = result.data.banner.list;
          this.recommends = result.data.recommend.list;
        }).catch((err) => {        
        });
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1;//获取第几页商品
        //按商品类型，页数请求数据  
        getHomeGoods(type, page).then((result) => {
                   console.log(result)         
          goods[type].list.push(...result.data.list);//将商品数据一个个追加，取代for遍历
          
          goods[type].page +=1;//跳到下一页
          console.log(goods[type].list)
        }).catch((err) => {     
        });
      }
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

  .tab-control {
    /*设置滚动时的置顶高度*/
    position: sticky;
    top: 44px;
  }
</style>
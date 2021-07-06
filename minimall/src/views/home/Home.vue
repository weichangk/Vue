<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <Scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <SwiperView :banners="banners"></SwiperView>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView/>
      <TabControl :titles="['流行', '新款', '精选']" 
                  class="tab-control"
                  @tabClick="tabClick"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backTopClick" v-show="isShowBackTop"></BackTop><!--组件不能直接监听click事件，需要Click.native-->

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import SwiperView from './childComps/SwiperView'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

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
        },
        currentType: 'pop',//商品类型
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        /*根据商品类型显示商品*/
        return this.goods[this.currentType].list;
      }
    },
    components: {
      NavBar,
      Scroll,
      SwiperView,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      BackTop,
    },
    created() {
      this.getHomeMultidata();

      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');


    },
    methods: {
      /*网络请求相关*/
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
          this.goods[type].list.push(...result.data.list);//将商品数据一个个追加，取代for遍历      
          this.goods[type].page +=1;//跳到下一页

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        }).catch((err) => {     
        });
      },


      /*事件监听相关*/
      /*tabcontrol点击切换商品类型*/
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType ="pop";
            break;
          case 1:
            this.currentType ="new";
            break;
          case 2:
            this.currentType ="sell";
            break;
        }
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0);// 回到顶部
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //按商品类型上拉加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
        // 完成上拉加载更多刷新，解决实际已经加载数据但是界面没有显示出来的问题
        this.$refs.scroll.refresh()
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
    }
  }
</script>

<style scoped>
/* 原生滚动
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    在使用浏览器原生滚动时, 为了让导航不跟随一起滚动
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    设置滚动时的置顶高度
    position: sticky;
    top: 44px;
    设置滚动时tab-control不被覆盖
    z-index: 9;
  }
*/

  #home {
    /*
    视口单位(Viewport units)在PC端，
    视口指的是在PC端，指的是浏览器的可视区域；
    而在移动端，它涉及3个视口：Layout Viewport（布局视口），Visual Viewport（视觉视口），Ideal Viewport（理想视口）。
    1vh等于视口高度的1%。
    */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    /*BScroll 可滑动的位置和范围*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0; 
  }


</style>
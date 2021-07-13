<template>
  <div id="home">
    <NavBar class="homeNav"><div slot="center">购物街</div></NavBar>
    <!--tabControl置顶默认不显示-->
    <tabControl :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tabControl" v-show="isTabFixed"/>
    <Scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <HomeSwiper :swiper-list="banners" @swiperLoad="swiperLoad"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView/>
      <TabControl :titles="['流行', '新款', '精选']" 
                  @tabClick="tabClick"
                  ref="tabControl2"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backTopClick" v-show="isShowBackTop"></BackTop><!--组件不能直接监听click事件，需要Click.native-->

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'
  import {debounce} from "common/utils";
  import {imgListenerMixin} from "@/common/mixin";

  export default {
    name: 'Home',
    // vue重复代码的混入
    mixins: [imgListenerMixin],
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
        saveY: 0,
        // itemImgListener: null,
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
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      BackTop,
    },
    activated() {
      //虽然router-view使用了keep-alive包装，但是由于使用了BScroll的问题，存在偶尔无法准确记录上一次离开时的位置状态
      //需要通过activated deactivated 使用和记录 scroll.y
      
      //进入组件时使用离开时的BScroll的y位置
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      // this.$refs.scroll.refresh()
      this.refresh();
    },
    deactivated() {
      //离开组件时记录上一次BScroll的y位置
      this.saveY = this.$refs.scroll.getScrollY()

      //取消监听事件，因为商品详情页中页使用了GoodsListItem组件也会触发itemImageLoad事件导致首页调用itemImgListener，需要离开时取消监听事件
      this.$bus.$off('itemImageLoad', this.imgListener)
    },
    created() {
      this.getHomeMultidata();

      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      this.tabClick(0);

      /*
      1. 解决首页中可滚动区域有时无法滚动完整的问题
      Better-Scroll在决定有多少区域可以滚动时, 是根据scrollerHeight属性决定
      scrollerHeight属性是根据放Better-Scroll的content中的子组件的高度
      但是我们的首页中, 刚开始在计算scrollerHeight属性时, 是没有将图片计算在内的，所以计算出来的告诉是错误的
      后来图片加载进来之后有了新的高度, 但是scrollerHeight属性并没有进行更新

      监听每一张图片是否加载完成, 只要有一张图片加载完成了, 执行一次refresh()
      将GoodsListItem.vue中的事件传入到Home.vue中
      因为涉及到非父子组件的通信, 所以这里我们选择了**事件总线**
      bus ->总线
      Vue.prototype.$bus = new Vue()
      this.bus.emit('事件名称', 参数)
      this.bus.on('事件名称', 回调函数(参数)

      2. 发现打开浏览器进入首页可以滑动，但切换到手机模式就本不能滑动了，需要刷新一次浏览器才行！
      */

      //使用mixins混入图片加载事件监听
      // // 图片加载完成的事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 50);//防抖，防止短时间内重复执行refresh。延时50ms后不被再次调用才执行调用
      
      // //对监听事件进行保存
      // this.itemImgListener = () => {
      //   refresh();//刷新
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
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

          // 完成滑动加载更多，允许下次滑动再次触发事件
          this.$refs.scroll.finishPullUp();
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
        if(this.$refs.tabControl1 !== undefined){
          this.$refs.tabControl1.currentIndex = index;//用于tabControl置顶显示
          this.$refs.tabControl2.currentIndex = index;
        }

      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0);// 回到顶部
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶(position: fixed)
        //tabControl置顶显示属性
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //按商品类型上拉加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
        // 完成上拉加载更多刷新，解决实际已经加载数据但是界面没有显示出来的问题
        this.$refs.scroll.refresh()
      },
      swiperLoad() {
        //所有的组件都有一个属性$el，用于获取组件中的元素
        //offsetTop：元素到offsetParent顶部的距离
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

  .homeNav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tabControl {
    position: relative;
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
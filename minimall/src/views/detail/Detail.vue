<template>
  <div class="product-detail">
    <!--导航栏-->
    <DetailNavBar @titleClick="titleClick" ref="detailNavBar"></DetailNavBar>
    <!--Scroll使用-->
    <scroll :probe-type="3" @scroll="detailScroll" class="scroll-height" ref="scroll">
      <!--轮播图-->
      <DetailSwiper :swiper-list="topImages"></DetailSwiper>
      <!--商品信息-->
      <DetailGoodsInfo :goods="goods"></DetailGoodsInfo>
      <!--店铺信息-->
      <DetailShopsInfo :shops="shops"></DetailShopsInfo>
      <!--商品图片效果信息-->
      <DetailImagesInfo :imagesInfo="detailInfo" @imgLoad="imgLoad"></DetailImagesInfo>
      <!--商品参数信息-->
      <DetailParamInfo :paramInfo="paramInfo" ref="params"></DetailParamInfo>
      <!--商品评论-->
      <DetailCommentInfo :commentInfo="commentInfo" class="detail-set-scroll" ref="comment"></DetailCommentInfo>
      <!--商品推荐-->
      <GoodsList :goods="recommends" ref="recommends"></GoodsList>
    </scroll>
    <!-- 回到顶部,监听组件的原生事件必须要用native修饰符变成原生组件 -->
    <transition name="scroll">
      <back-top @click.native="backTop" v-show="curPosition < -1500" />
    </transition>
    <!--底部工具栏-->
    <DetailBottomBar></DetailBottomBar>
  </div>
</template>

<script>
  import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from "@/components/content/backTop/BackTop";

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailShopsInfo from './childComps/DetailShopsInfo'
  import DetailImagesInfo from './childComps/DetailImagesInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import {debounce} from "common/utils";
  import {imgListenerMixin, backTopMixin} from "@/common/mixin";

  export default {
    name: "Detail",
    //mixins的使用
    mixins: [imgListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        //商品轮播图数据
        topImages: [],
        //商品信息
        goods: {},
        //店铺信息
        shops: {},
        //商品图片效果信息
        detailInfo: {},
        //商品参数信息
        paramInfo: {},
        //商品评论
        commentInfo: {},
        //推荐苏数据
        recommends: [],
        // itemImgListener: null,
        //标题对应内容高度
        chemeTopYs: [],//[0, -1000, -2000, -3000],
        //获取标题对应内容高度
        getChemeTopYs: null,
        //
        currentIndex: 0,
      }
    },
    created() {
      this.iid = getDetail(this.$route.params.iid);
      //根据商品id获取商品详情信息
      getDetail(this.$route.params.iid).then((result) => {
        // console.log(result);
        const data = result.result;
        //获取商品详情顶部轮播图
        this.topImages = data.itemInfo.topImages;
        // console.log(this.topImages);

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // console.log(this.goods)

        //获取店铺信息
        this.shops = new Shop(data.shopInfo);   
        // console.log(this.shops)

        //商品图片效果信息
        this.detailInfo = data.detailInfo;
        // console.log(this.detailInfo);

        //商品参数信息
        this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});
        // console.log(this.paramInfo);

        // 获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
          // console.log(this.commentInfo)
        }

      }).catch((err) => {     
      });
      //请求推荐数据
      getRecommend().then((result) => {
        this.recommends = result.data.list;
        // console.log(this.recommends);
      }).catch((err) => {  
      });
      //防抖 获取标题对应内容高度
      this.getChemeTopYs = debounce(()=>{
        //确保DOM已经被渲染完整，图片加载完整，获取到的offsetTop才正确
        // this.$nextTick(()=>{
          this.chemeTopYs = [];
          this.chemeTopYs.push(0);   
          this.chemeTopYs.push(0 - this.$refs.params.$el.offsetTop);
          this.chemeTopYs.push(0 - this.$refs.comment.$el.offsetTop);
          this.chemeTopYs.push(0 - this.$refs.recommends.$el.offsetTop);
          // console.log(this.chemeTopYs);
        // })
      }, 100)
    },
    components: {
      DetailNavBar,
      Scroll,
      DetailSwiper,
      DetailGoodsInfo,
      DetailShopsInfo,
      DetailImagesInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
    },
    methods: {
      // 监听详情页滚动事件,并动态设置navBar的index
      detailScroll(position) {        
        let curPositionY = position ? position.y : 0;
        this.curPosition = curPositionY; 
        if(curPositionY <= this.chemeTopYs[3]){
          this.$refs.detailNavBar.currentIndex = 3;
        }else if(curPositionY <= this.chemeTopYs[2]){
          this.$refs.detailNavBar.currentIndex = 2;
        }else if(curPositionY <= this.chemeTopYs[1]){
          this.$refs.detailNavBar.currentIndex = 1;
        }else{
          this.$refs.detailNavBar.currentIndex = 0;
        }

      },
      imgLoad() {
        //this.$refs.scroll.refresh();
        this.refresh();
        this.getChemeTopYs();
      },
      //标题选择点击事件函数
      titleClick(index) {
        // console.log(index);

        //滚动到对于标题内容
        this.$refs.scroll.scrollTo(0, this.chemeTopYs[index], 100);
      },
    },
    mounted() {
      //使用mixins混入图片加载事件监听
      // // 图片加载完成的事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 50);
      // //对监听事件进行保存
      // this.itemImgListener = () => {
      //   refresh();//刷新
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.imgListener)
    },
    updated() {
    },
  }
</script>

<style scoped>
.product-detail {
  width: 100%;
  height: 100%;
}

/* BScroll固定高度和区域 */
.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}


</style>
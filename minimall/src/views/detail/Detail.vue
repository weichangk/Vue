<template>
  <div class="product-detail">
    <!--导航栏-->
    <DetailNavBar></DetailNavBar>
    <!--Scroll使用-->
    <scroll :probe-type="3" @backTopScroll="detailScroll" class="scroll-height" ref="scroll">
      <!--轮播图-->
      <DetailSwiper :swiper-list="topImages"></DetailSwiper>
      <!--商品信息-->
      <DetailGoodsInfo :goods="goods"></DetailGoodsInfo>
      <!--店铺信息-->
      <DetailShopsInfo :shops="shops"></DetailShopsInfo>
      <!--商品图片效果信息-->
      <DetailImagesInfo :imagesInfo="detailInfo" @imgLoad="imgLoad"></DetailImagesInfo>
      <!--商品参数信息-->
      <DetailParamInfo :paramInfo="paramInfo"></DetailParamInfo>
      <!--商品评论-->
      <DetailCommentInfo :commentInfo="commentInfo" class="detail-set-scroll"></DetailCommentInfo>
      <!--商品推荐-->
      <GoodsList :goods="recommends"></GoodsList>
    </scroll>

  </div>
</template>

<script>
  import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail'

  import Scroll from 'components/common/scroll/Scroll'
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailShopsInfo from './childComps/DetailShopsInfo'
  import DetailImagesInfo from './childComps/DetailImagesInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import {debounce} from "common/utils";
  import {imgListenerMixin} from "@/common/mixin";

  export default {
    name: "Detail",
    //mixins的使用
    mixins: [imgListenerMixin],
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
    },
    methods: {
      // 监听详情页滚动事件,并动态设置navBar的index
      detailScroll(position) {
        // let detailPosition = position ? -position.y : 0;
        // this.curPosition = detailPosition;

        // for (let i = 0; i < this.detailClassList.length - 1; i++) {
        //   if (
        //     detailPosition >= this.detailClassList[i].offsetTop &&
        //     detailPosition < this.detailClassList[i + 1].offsetTop
        //   ) {
        //     if (this.detailIndex !== i) {
        //       this.detailIndex = i;
        //       this.$refs.detailNavBar.currentIndex = this.detailIndex;
        //     }
        //     break;
        //   }
        // }
      },
      imgLoad() {
        //this.$refs.scroll.refresh();
        this.refresh();
      }
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
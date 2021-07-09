<template>
  <div id="detail">
    <!--导航栏-->
    <DetailNavBar></DetailNavBar>
    <!--轮播图-->
    <DetailSwiper :swiper-list="topImages"></DetailSwiper>
    <!--商品信息-->
    <DetailGoodsInfo :goods="goods"></DetailGoodsInfo>
    <!--店铺信息-->
    <DetailShopsInfo :shops="shops"></DetailShopsInfo>
  </div>
</template>

<script>
  import {getDetail, Goods, Shop} from 'network/detail'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailShopsInfo from './childComps/DetailShopsInfo'

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        //商品轮播图数据
        topImages: [],
        //商品信息
        goods: {},
        //店铺信息
        shops: {},
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
        console.log(this.goods)
        //获取店铺信息
        this.shops = new Shops(data.shopInfo);

      }).catch((err) => {
        
      });
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailGoodsInfo,
      DetailShopsInfo,

    }
  }
</script>

<style scoped>
</style>
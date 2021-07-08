<template>
  <div id="detail">
    <DetailNavBar></DetailNavBar>
    <DetailSwiper :topImages="topImages">
    </DetailSwiper>
  </div>
</template>

<script>
  import {getDetail} from 'network/detail'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    created() {
      this.iid = getDetail(this.$route.params.iid);
      //根据商品id获取商品详情信息
      getDetail(this.$route.params.iid).then((result) => {
        console.log(result);
        //获取商品详情顶部轮播图
        this.topImages = result.result.itemInfo.topImages;
        console.log(this.topImages);
      }).catch((err) => {
        
      });
    },
    components: {
      DetailNavBar,
      DetailSwiper,
    }
  }
</script>

<style scoped>
</style>
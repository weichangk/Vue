<template>
  <div class="detail-swiper">
    <swiper>
      <SwiperItem v-for="item in topImages">
        <img :src="item" alt="">
      </SwiperItem>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    components: {
      Swiper,
      SwiperItem,
    }
  }
</script>

<style scoped>
</style>
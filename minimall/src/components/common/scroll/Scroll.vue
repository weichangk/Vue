<template>
  <!--BScroll 封装格式-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        message: '哈哈哈'
      }
    },

    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        //默认情况下content元素下的div的click事件是监听不到的，需要设置属性click: true实现监听
        click: true,

        //默认情况下BScroll是不可以实时监听滚动位置的
        //probeType侦测属性
        //0和1都不侦测实时位置
        //2 在手指滑动的过程中侦测，手指离开后的惯滑动不侦测
        //3 只要滑动都侦测，包含滑动惯性
        probeType: this.probeType,

        //向上滑动加载更多属性，pullUpLoad: true 开启
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        //开启向上滑动功能时scroll.on 监听事件 this.$emit('scroll', position)
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      // 3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')

          //没调用BScroll.finishPullUp();之前不能再次滑动进入scroll.on方法
          //BScroll.finishPullUp();
        })
      }
    },
    methods: {
      //滑动到某个位置
      scrollTo(x, y, time=300) {
        //this.scroll &&  调用this.scroll的方法之前, 判断this.scroll对象是否有值
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      //完成一次向上滑动加载，下次可再次加载
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>

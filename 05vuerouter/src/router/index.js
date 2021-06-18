import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import User from '../views/User.vue'
const User = () => import('../views/User.vue')
// 路由的懒加载
const LazyTest = () => import('../views/LazyTest.vue')
const HomeNews = () => import('../views/HomeNews.vue')
const HomeMsgs = () => import('../views/HomeMsgs.vue')
const RoutequeryTest = () => import('../views/RoutequeryTest')
// 导入组件

// 1.注入路由插件
Vue.use(VueRouter)

// 2.定义路由。配置组件和路径的映射关系
const routes = [
  {
    // 路由的默认路径
    // 默认情况下, 进入网站的首页, 我们希望<router-view>渲染首页的内容
    path: '/',
    // name: 'Home',
    // component: Home
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 嵌套路由
    children: [
      // 为了使有嵌套路由的界面能够在保存上一次嵌套界面显示的子界面状态，不应该设置嵌套路由默认路由，因为设置嵌套路由默认路由会每次都是展示该子路由界面
      // 应该在有嵌套路由的根vue实例中使用data 指定模式path 结合activated调用this.$router.push来实现默认展示子界面
      // 再用beforeRouteLeave 来记住离开前的path = this.$router.push 下次再进到该界面是activated调用this.path = this.$route.path;就能显示上次离开时显示的子界面了。
      // 注意：这种存在嵌套又想保存上次显示子界面状态的需要在keep-alive模式下。非keep-alive模式需要用created调用默认子路由，beforeRouteLeave保存上次子路由路径，子路由不能保存在vue实例中了，需要保留到全局变量中。。
      // {
      //   // 嵌套路由默认路由
      //   path: '',
      //   redirect: 'homeMsgs'
      // },
      {
        path: 'homeNews',
        name: 'HomeNews',
        component: HomeNews
      },
      {
        path: 'homeMsgs',
        name: 'HomeMsgs',
        component: HomeMsgs
      }
    ],
    meta: {
      // 路由元信息
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'About'
    },
    // 路由的懒加载
    // 路由级代码拆分
    // 生成一个单独的chunk (about.[hash].js)
    // 当路由被访问时被惰性加载。
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    // 使用动态路由
    path: '/user/:userId',
    name: 'User',
    component: User,
    meta: {
      title: 'User'
    },
  },
  {
    path: '/lazyTest',
    name: 'LazyTest',
    // 路由的懒加载
    component: LazyTest,
    meta: {
      title: 'LazyTest'
    },
  },
  {
    path: '/routequeryTest',
    name: 'routequeryTest',
    component: RoutequeryTest,
    meta: {
      title: 'LazyTest'
    },
  }
]

// 3.创建路由实例
const router = new VueRouter({
  // 使用HTML5的history模式实现改变url页面不进行刷新，不向服务器重新请求资源。不配置mode时默认使用URL的hash模式
  mode: 'history',
  base: process.env.BASE_URL,
  // 通过linkActiveClass重命名router-link-active类
  // linkActiveClass: 'active',
  // 配置路由和组件间的应用关系
  routes
})

// 使用全局前置守卫 router.beforeEach 和 路由元信息 修改标题
router.beforeEach((to, from, next) => {
  window.document.title = to.matched[0].meta.title;// 使用matched[0]为了获取嵌套子路由的根路由
  next();
})

// 4.导出路由实例
export default router

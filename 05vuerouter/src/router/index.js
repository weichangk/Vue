import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
// 导入组件

// 1.注入路由插件
Vue.use(VueRouter)

// 2.定义路由。配置组件和路径的映射关系
const routes = [
  {
    // 路由的默认路径
    // 默认情况下, 进入网站的首页, 我们希望<router-view>渲染首页的内容
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    // 使用动态路由
    path: '/user/:userId',
    name: 'User',
    component: User
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

// 4.导出路由实例
export default router

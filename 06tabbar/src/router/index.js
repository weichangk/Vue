import { createRouter, createWebHistory } from 'vue-router'
//import { createRouter, createWebHashHistory } from 'vue-router'
const Home = () => import('../views/home/Home.vue');
const Shopcart = () => import('../views/cart/Shopcart.vue');
const Category = () => import('../views/category/Category.vue');
const Profile = () => import('../views/profile/Profile.vue');


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component: Shopcart,
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  //history: createWebHashHistory(),
  routes: routes,
})



export default router

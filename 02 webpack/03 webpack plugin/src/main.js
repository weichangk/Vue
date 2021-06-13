console.log("aaa");
console.log("bbb");

import {add, mul} from './js/aaa.js'

console.log(add(1, 2));
console.log(mul(3, 3));

//依赖css模块
require('./css/normal.css')
//import css from "./css/normal.css";

require('./css/special.less')
//import css from "./css/special.less";


//使用vue 进行开发
import Vue from "vue";
import App from "./vue/App.vue"

new Vue({
  el: "#app",
  template: "<App/>",
  components:{
    App,
  }
})
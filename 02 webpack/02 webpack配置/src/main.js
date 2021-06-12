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
// const app = new Vue({
//   el: "#app",
//   data: {
//     msg: "hello 使用vue 进行开发 webpack 配置"
//   }
// })

//真实开发中不需要 const app =
new Vue({
  el: "#app",
  data: {
    msg: "hello 使用vue 进行开发 webpack 配置"
  }
})
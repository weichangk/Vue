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

//1. 真实开发中不需要 const app =
// new Vue({
//   el: "#app",
//   data: {
//     msg: "hello 使用vue 进行开发 webpack 配置"
//   }
// })

//2. Vue实例中同时指定了template，那么template模板的内容会替换掉挂载的对应el的模板。不需要在以后的开发中修改index.html
// new Vue({
//   el: "#app",
//   template: `
//   <div>
//     <h2>{{msg}}</h2>
//     <button @click="btnClick">按钮</button>
//     <h3>{{name}}</h3>
//   </div>
//   `,
//   data: {
//     msg: "hello 使用vue 进行开发 webpack 配置",
//     name: "weichangk",
//   },
//   methods: {
//     btnClick(){
//       console.log("...");
//     }
//   }
// })

//3. 抽取
//抽取组件
// const App = {
//   template: `
//   <div>
//     <h2>{{msg}}</h2>
//     <button @click="btnClick">按钮</button>
//     <h3>{{name}}</h3>
//   </div>
//   `,
//   data(){
//     return{
//       msg: "hello 使用vue 进行开发 webpack 配置",
//       name: "weichangk",
//     }
//   },
//   methods: {
//     btnClick(){
//       console.log("...");
//     }
//   }
// }


//4. 分离：将抽取的组件写到其他js模块文件中 vue/app.js
// import App from "./vue/app.js";

//5. .vue文件封装处理。将4. 抽取的js组件模块 用vue组件的格式替代 vue/App.vue
import App from "./vue/App.vue"

//vue实例注册组件并使用组件
new Vue({
  el: "#app",
  template: "<App/>",
  components:{
    App,
  }
})
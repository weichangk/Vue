# 05vuerouter

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

----

# vue-router 测试项目
  1. 该项目使用vue-cli3创建，使用了vue-router组件。

## 什么是路由？
 1. 路由（routing）就是通过互联的网络把信息从源地址传输到目的地址的活动. --- 维基百科
 2. 路由是一个网络工程里面的术语。
 3. 路由器提供了两种机制: 路由和转送。
      路由是决定数据包从来源到目的地的路径。
      转送将输入端的数据转移到合适的输出端。
 4. 对于后端路由来说：路由是根据不同的 url 地址访问不同的控制器渲染相应的页面。（如：asp.net mvc）。
 5. 对于前端路由来说：路由是根据不同的 url 地址展示不同的内容或页面。

## 了解后端/前端路由之前先了解后端渲染/前端渲染
### 后端渲染
- 服务器直接生产渲染好对应的HTML页面, 返回给客户端进行展示。比如：jsp页面、asp.net mvc的控制器。
- 好处：前端耗时少，即减少了首屏时间，模板统一在后端。前端（相对）省事，不占用客户端运算资源（解析模板）。
- 坏处：占用服务器资源。

### 前端渲染
- 浏览器中显示的网页中的大部分内容，都是由前端写的 js 代码在浏览器中执行，最终渲染出来的网页。后端返回JSON数据，前端利用预先写的html模板，循环读取JSON数据，拼接字符串，并插入页面。
- 好处：网络传输数据量小。不占用服务端运算资源（解析模板），模板在前端（很有可能仅部分在前端），改结构变交互都前端自己来了，改完自己调就行。
- 坏处：前端耗时较多，对前端工作人员水平要求相对较高。前端代码较多，因为部分以前在后台处理的交互逻辑交给了前端处理。占用少部分客户端运算资源用于解析模板。

### 前端渲染与后端渲染对比
- 后端渲染
  - 页面呈现速度：快，受限于用户的带宽。
  - 流量消耗：少一点点（可以省去前端框架部分的代码）。
  - 可维护性：差（前后端东西放一起，掐架多年，早就在闹分手啦）。
  - seo友好度：好。
  - 编码效率：低（这个跟不同的团队不同，可能不对）。

- 前端渲染：
  - 页面呈现速度：主要受限于带宽和客户端机器的好坏，优化的好，可以逐步动态展开内容，感觉上会更快一点。
  - 流量消耗：多一点点（一个前端框架大概50KB）当然，有的用后端渲染的项目前端部分也有在用框架。
  - 可维护性：好，前后端分离，各施其职，代码一目明了。
  - SEO友好度：差，大量使用ajax，多数浏览器不能抓取ajax数据。
  - 编码效率：高，前后端各自只做自己擅长的东西，后端最后只输出接口，不用管页面呈现，只要前后端人员能力不错，效率不会低。


## 后端路由
- 早期的网站开发整个HTML页面是由服务器来渲染的。服务器直接生产渲染好对应的HTML页面, 返回给客户端进行展示。
- 当我们页面中需要请求不同的路径内容时, 交给服务器来进行处理, 服务器渲染好整个页面, 并且将页面返回给客户顿。这种情况下渲染好的页面, 不需要单独加载任何的js和css, 可以直接交给浏览器展示
- 一个页面有自己对应的网址, 也就是URL。URL会发送到服务器, 服务器会通过正则对该URL进行匹配, 并且最后交给一个Controller进行处理。Controller进行各种处理, 最终生成HTML或者数据, 返回给前端。这就完成了一个IO操作。这种操作, 就是后端路由。
- 后端路由的缺点：整个页面的模块由后端人员来编写和维护的；前端开发人员如果要开发页面, 需要通过PHP和Java等语言来编写页面代码；通常情况下HTML代码和数据以及对应的逻辑会混在一起, 编写和维护都是非常糟糕的事情。

## 前端路由
- 前后端分离阶段
  - 随着Ajax的出现, 有了前后端分离的开发模式。
  - 后端只提供API来返回数据, 前端通过Ajax获取数据, 并且可以通过JavaScript将数据渲染到页面中。
  - 这样做最大的优点就是前后端责任的清晰, 后端专注于数据上, 前端专注于交互和可视化上。
  - 并且当移动端(iOS/Android)出现后, 后端不需要进行任何处理, 依然使用之前的一套API即可。
  - 目前很多的网站依然采用这种模式开发。

- 单页面富应用阶段
  - 其实SPA最主要的特点就是在前后端分离的基础上加了一层前端路由，也就是前端来维护一套路由规则。
  - 前端路由的核心是改变URL调用指点的内容或页面（vue中的组件），改变url不会向服务器重新请求资源，页面不进行整体的刷新。

## 如何实现改变url页面不进行刷新，不向服务器重新请求资源？
- URL的hash
  - URL的hash也就是锚点(#), 本质上是改变window.location的href属性。
  - 我们可以通过直接赋值location.hash来改变href, 但是页面不发生刷新。

- HTML5的history模式
  - history.pushState()
  - history.replaceState()
  - history.go()
  - history.back()  等价 history.go(-1)
  - history.forward() 等价 history.go(1)


## 认识vue-router
- 目前前端流行的三大框架, 都有自己的路由实现。Angular的ngRouter；React的ReactRouter；Vue的vue-router
- vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。官方网站: https://router.vuejs.org/zh/
- vue-router是基于路由和组件的。路由用于设定访问路径, 将路径和组件映射起来。在vue-router的单页面应用中, 页面的路径的改变就是组件的切换。

## vue-router安装和创建router实例
- 在使用cli创建项目时选择上vue-router
- 在项目文件src中生成router/index.js文件
- 导入vue 和vue-router对象，并且调用 Vue.use(VueRouter)
- 路由映射配置，创建路由实例并且传入路由映射配置，导出路由实例。
- 导出的路由实例挂载到Vue实例中。

## 使用vue-router
- 创建路由组件
- 配置路由映射: 组件和路径映射关系
- 使用路由: 通过 router-link 和 router-view 
- router-link标签是一个vue-router中已经内置的组件, 没有设置tag属性时它会被默认渲染成一个 a 标签
- router-view标签会根据当前的路径, 动态渲染出不同的组件。在路由切换时, 切换的是router-view挂载的组件, 其他内容不会发生改变。

## router-link属性补充
- tag属性指定渲染标签类型，如tag = 'button' 则渲染为 button 标签，不设置该属性则默认渲染为a标签
- replace: replace不会留下history记录, 所以指定replace的情况下, 后退键返回不能返回到上一个页面中。
- router-link-exact-active: 当 router-link 对应的路由匹配成功时, 会自动给当前元素设置一个router-link-exact-active的class。
- 在创建路由实例中添加linkActiveClass属性指定别名可以重命名router-link-active。

## 动态路由
- 在某些情况下，一个页面的path路径可能是不确定的，比如path路径的拼接由组件data中的数据或计算属性决定。

## $router
- router是VueRouter的一个对象，通过Vue.use(VueRouter)和VueRouter构造函数得到一个router的实例对象，这个对象中是一个全局的对象，他包含了所有的路由包含了许多关键的对象和属性。如路由的跳转方法，钩子函数等。
- $router.push({path:'home'});本质是向history栈中添加一个路由，在我们看来是 切换路由，但本质是在添加一个history记录。
- $router.replace({path:'home'});//替换路由，没有历史记录。
## $route
- route是一个跳转的路由对象，每一个路由都会有一个route对象，是一个局部的对象，可以获取对应的包括name、meta、path、hash、query、params、fullPath、matched、redirectedFrom等。
- $route表示导出的路由对象router中的routers路由数组中处于活跃状态的路由。
- $route.params 对象，包含路由中的动态片段和全匹配片段的键值对。$route.param.xxx 可以获取路由参数。
- $route.path 字符串，等于当前路由对象的路径，会被解析为绝对路径，如 "/home/news" 。
- $route.query 对象，包含路由中查询参数的键值对。例如，对于 /home/news/detail/01?favorite=yes ，会得到$route.query.favorite == 'yes' 。
- $route.router 路由规则所属的路由器（以及其所属的组件）。
- $route.matched 数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。   
- $route.name 当前路径的名字，如果没有使用具名路径，则名字为空。

## 路由的懒加载
- 当打包构建应用时，Javascript 包会变得非常大，影响页面加载。
- 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
- 我们知道路由中通常会定义很多不同的页面。这个页面最后被打包在哪里呢? 一般情况下, 是放在一个js文件中。但是, 页面这么多放在一个js文件中, 必然会造成这个页面非常的大。如果我们一次性从服务器请求下来这个页面, 可能需要花费一定的时间, 甚至用户的电脑上还出现了短暂空白的情况。如何避免这种情况呢? 使用路由懒加载就可以了。
- 路由懒加载做了什么？
  - 路由懒加载的主要作用就是将路由对应的组件打包成一个个的js代码块。
  - 只有在这个路由被访问到的时候, 才加载对应的组件。
  - 路由级代码拆分
  - 生成一个单独的chunk (about.[hash].js) 
  - 当路由被访问时被惰性加载。

- 懒加载的方式
  - AMD写法 const About = resolve => require(['../components/About.vue'], resolve);
  - ES6写法 const Home = () => import('../components/Home.vue')

## 嵌套路由
- 比如在home页面中, 我们希望通过/home/news和/home/message访问一些内容。/home/news和/home/message 是嵌套在home路由中的。
- 实现嵌套路由步骤
  - 创建对应的子组件。
  - 在父级路由映射children:中配置对应的子路由。
  - 在父组件模板内部使用 router-link 和 router-view 标签来实现子组件切换。
  - 可在children:中配置默认子路由。

## 路由传递参数的方式
- 传递参数主要有两种类型: params和query
- params的类型
  - 配置路由格式: /router/:id
  - 传递的方式: 在path后面跟上对应的值
  - 传递后形成的路径: /router/123, /router/abc
- query的类型
  - 配置路由格式: /router, 也就是普通配置
  - 传递的方式: 对象中使用query的key作为传递方式。如 router-link :to="{path: '/profile', query: {name: ''weichangk, age: 25}}">























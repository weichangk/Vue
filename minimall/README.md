# minimall

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

----
### 项目流程
- cli3 创建
- cli3创建时使用 router vuex组件 使用vue 2.x版本
- 创建项目文件结构
- 引入normalize.css github.com/necolas/normalize.css
- 创建vue.config.js
- 创建.editorconfig
- 引入Tabbar
- 配置路由
- 引入axios
- 首页导航封装
- 请求首页数据
- 首页添加轮播图组件
- 首页添加推荐信息组件
- 首页添加特色信息组件
- TabControl组件封装
- 商品数据按类型页数请求 保存 展示 类型切换
- 引入better-scroll https://github.com/ustbhuangyi/better-scroll npm install better-scroll@1.13.2 --save
- Scroll组件封装使用
- Scroll使用中的图片加载完成刷新获取正确scrollerHeight
- Scroll使用中的滑动加载和防抖动
- Scroll使用中的TabControl吸顶效果
- 回到顶部BackTop组件封装使用
- 首页使用了Scroll中保存离开时的位置状态


### 遇到的问题
- vue-router报错Uncaught (in promise)及解决方法
  - Vue-Router版本到到3.1.0及以上之后，页面在跳转路由控制台会报Uncaught (in promise)的问题，在3.1.0版本里面新增功能：push和replace方法会返回一个promise, 你可能在控制台看到未捕获的异常。
  - 解决方法：
    - 在调用方法的时候用catch捕获异常
      ```
      this.$router.replace('/home').catch(err => {
        console.log(err)
      })
      ```
    - 对Router原型链上的push、replace方法进行重写，这样就不用每次调用方法都要加上catch。在router.js加入以下内容：
      ```
      import Router from 'vue-router'      
      const originalPush = Router.prototype.push
      Router.prototype.push = function push(location, onResolve, onReject) {
        if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
        return originalPush.call(this, location).catch(err => err)
      }
      const originalReplace = Router.prototype.replace
      Router.prototype.replace = function replace(location, onResolve, onReject) {
        if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
        return originalReplace.call(this, location).catch(err => err)
      }
      ```






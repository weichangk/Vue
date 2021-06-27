# 09axios

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
## axios test
- 官网 http://www.axios-js.com/zh-cn/docs/
- Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
- 特性
  - 从浏览器中创建 XMLHttpRequests
  - 从 node.js 创建 http 请求
  - 支持 Promise API
  - 拦截请求和响应
  - 转换请求数据和响应数据
  - 取消请求
  - 自动转换 JSON 数据
  - 客户端支持防御 XSRF

### 安装
- vue项目添加axios框架 npm install axios --save
- 在使用axios的vue组件中 import axios from 'axios' 再调用axios的具体方法。
- 该axios测试项目使用httpbin进行案例测试。httpbin http://httpbin.org/

### 请求方法的别名
- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.options(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

### 并发
- axios.all(iterable)
- axios.spread(callback)

### axios的实例
- 当我们从axios模块中导入对象时, 使用的实例是默认的实例.当给该实例设置一些默认配置时, 这些配置就被固定下来了.但是后续开发中, 某些配置可能会不太一样.比如某些请求需要使用特定的baseURL或者timeout或者content-Type等.这个时候, 我们就可以创建新的实例, 并且传入属于该实例的配置信息。
- 创建实例 const instance = axios.create({})
- axios封装

### 拦截器
- 请求拦截。请求拦截中错误拦截较少，通常都是配置相关的拦截，可能的错误比如请求超时，可以将页面跳转到一个错误页面中。
- 响应拦截。响应的成功拦截中，主要是对数据进行过滤。响应的失败拦截中，可以根据status判断报错的错误码，跳转到不同的错误提示页面。







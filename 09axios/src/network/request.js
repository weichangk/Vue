import axios from 'axios'

// axios 封装

export function request(config) {
  // 创建实例
  const instance = axios.create({
    baseURL: 'http://httpbin.org/',
    timeout: 2000
  })

  // 发送网络请求
  // AxiosInstance 继承了 AxiosPromise 
  return instance(config)
}

// 传入配置和回调
export function request1(config, success, failure) {
  // 创建实例
  const instance = axios.create({
    baseURL: 'http://httpbin.org/',
    timeout: 2000
  })

  // 发送网络请求
  instance(config)
    .then(res => success(res))
    .catch(err => failure(err))
}

// 将参数合并为一个对象
export function request2(config) {
  // 创建实例
  const instance = axios.create({
    baseURL: 'http://httpbin.org/',
    timeout: 2000
  })

  // 发送网络请求
  instance(config.baseConfig)
    .then(res => config.success(res))
    .catch(err => config.failure(err))
}

// 返回 Promise
export function request3(config) {
  return new Promise((resolve, reject) => {
    // 创建实例
    const instance = axios.create({
      baseURL: 'http://httpbin.org/',
      timeout: 2000
    })

    // 发送网络请求
    instance(config)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })

}


// 使用请求和响应拦截器
export function request4(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://httpbin.org/',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求

    // 2.比如每次发送网络请求时, 都希望在界面中显示一个请求的图标

    // 3.某些网络请求(比如登录(token)), 必须携带一些特殊的信息
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}


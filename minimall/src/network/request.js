import axios from 'axios'

function getBaseURL() {
  try {
    var baseURL = require("./baseurl")
    return baseURL.baseURL;
  } catch (e) {
    return "http://123.207.32.32:8000/";//联系coderwhy老师获取新接口！
  }
}

export function request(config) {
  const instance = axios.create({
    baseURL: getBaseURL(),
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    // console.log(err);
  })

  return instance(config)
}


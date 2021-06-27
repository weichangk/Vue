<template>
  <div id="app">
    <h1>{{msg}}</h1>
    <hr/>  
    <button @click='helloAxios'>helloAxios</button>
    <button @click='requestTest'>requestTest</button>
    <button @click='request1Test'>request1Test</button>
    <button @click='request2Test'>request2Test</button>
    <button @click='request3Test'>request3Test</button>
    <button @click='request4Test'>request4Test</button>
    <div>
      {{result}}
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {request, request1, request2, request3, request4} from './network/request.js'

  export default {
    name: 'App',
    data() {
      return {
        msg: 'axios test',
        result: '',
      }
    },
    methods: {
      // 了解axios
      helloAxios() {
        axios({
          url: 'http://httpbin.org/get',
          params: {
            ID: 12345
          }
        }).then(res=>{
          this.result = res;
        })
      },

      requestTest() {
        request({
          url: 'get',
          params: {
            name: 'requestTest'
          }
        }).then((result) => {
          this.result = result;
        }).catch((err) => {
          this.result = err;
        });
      },

      // 使用axios封装模块的方法request1创建实例
      request1Test() {
        request1({
          url: 'get',
          params: {
            name: 'request1Test'
          }
        }, res => {
          this.result = res;
        }, err => {
          this.result = err;
        })
      },

      // 使用axios封装模块的方法request2创建实例
      request2Test() {
        request2({
          baseConfig: {
            url: 'get',
            params: {
              name: 'request2Test'
            }
          },
          success: function(res) {
            this.result = res // 为什么这样写界面显示不出来！！！！
            console.log(res)
          },
          failure: function(err) {
            this.result = err
            console.log(err)
          }
        })
      },

      // 使用axios封装模块的方法request3创建实例
      request3Test() {
        request3({
          url: 'get',
          params: {
            name: 'request3Test',
          },
        }).then((result) => {
          this.result = result;
        }).catch((err) => {
          this.result = err;
        });
      },

      // 使用axios封装模块的方法request4创建实例 使用了拦截器
      request4Test() {
        request4({
          url: 'get',
          params: {
            name: 'request4Test',
          },
        }).then((result) => {
          this.result = result;
        }).catch((err) => {
          this.result = err;
        });
      }

    }
  }
</script>

<style>

</style>

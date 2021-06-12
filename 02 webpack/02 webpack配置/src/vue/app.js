export default{
  template: `
  <div>
    <h2>{{msg}}</h2>
    <button @click="btnClick">按钮</button>
    <h3>{{name}}</h3>
  </div>
  `,
  data(){
    return{
      msg: "hello 使用vue 进行开发 webpack 配置",
      name: "weichangk",
    }
  },
  methods: {
    btnClick(){
      console.log("...");
    }
  }
}
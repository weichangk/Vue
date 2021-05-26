const app = new Vue({
  el: "#app",
  data: {
    books:[
      {
        id: 1,
        name: "html",
        date: "2021-1",
        price: 10.09,
        count: 1,
      },
      {
        id: 2,
        name: "css",
        date: "2021-2",
        price: 20.155,
        count: 1,
      },
      {
        id: 3,
        name: "javaScript",
        date: "2021-3",
        price: 30,
        count: 1,
      },
      {
        id: 4,
        name: "jQuery",
        date: "2021-4",
        price: 40,
        count: 1,
      },
      {
        id: 5,
        name: "Vue",
        date: "2021-5",
        price: 50,
        count: 1,
      },
    ]
  },
  methods: {
    increment(index){
      this.books[index].count ++
    },
    decrement(index){
      this.books[index].count --
    },
    removeHandle(index) {
      this.books.splice(index, 1)
    }
  },
  computed: {
    totalPrice(){
      // 1.普通的for循环
      // let totalPrice = 0
      // for (let i = 0; i < this.books.length; i++) {
      //   totalPrice += this.books[i].price * this.books[i].count
      // }
      // return totalPrice

      // 2.for (let i in this.books)
      // let totalPrice = 0
      // for (let i in this.books) {
      //   const book = this.books[i]
      //   totalPrice += book.price * book.count
      // }
      //
      // return totalPrice

      // 3.for (let i of this.books)
      // let totalPrice = 0
      // for (let item of this.books) {
      //   totalPrice += item.price * item.count
      // }
      // return totalPrice
      
      return this.books.reduce(function (preValue, book) {
        return preValue + book.price * book.count
      }, 0)
    }
  },
  filters: {
    showPrice(price,x,y) {
      return '¥' + price.toFixed(2)//加￥前缀并保留两位小数(四舍五入)
    }
  }
})
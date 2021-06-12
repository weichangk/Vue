const path = require('path');

module.exports = {
  //入口：可以是字符串、数组、对象
  entry: './src/main.js',
  //出口：通常是一个对象，至少包含两个属性path和filename，path通常绝对路径
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      //css文件处理 – css-loader
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      //less文件处理 – less-loader
      {
        test: /\.less$/i,
        loader: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      //图片文件处理 – url-loader
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      //ES6语法转成ES5处理 babel-loader
      {
        test: /\.js$/,
        // exclude: 排除
        // include: 包含
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
    ],
  },
  //默认使用的是runtime-only版本的Vue 通过配置改为 runtime-compiler版本
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
}
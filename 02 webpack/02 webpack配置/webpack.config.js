const path = require('path');

module.exports = {
  //入口：可以是字符串、数组、对象
  entry: './src/main.js',
  //出口：通常是一个对象，至少包含两个属性path和filename，path通常绝对路径
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        loader: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
}
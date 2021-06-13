const baseConfig = require("./base.config");

const webpackMerge = require('webpack-merge'); 

module.exports = webpackMerge(baseConfig, {
  devServer: {
    contentBase: './dist',
    port: 54321,
    inline: true
  },
})

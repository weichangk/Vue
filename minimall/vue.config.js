module.exports = {
  configureWebpack: {
    resolve: {
      // 配置别名
      alias: {
        //'@': 'src' 已经默认配置
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
# 04vuecli3

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

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


``` bash
# vue-cli 3 与 2 版本有很大区别
  Vue CLI2初始化项目 vue init webpack my-project   Vue CLI3初始化项目 vue create my-project
  vue-cli 3 是基于 webpack 4 打造，vue-cli 2 还是 webapck 3
  vue-cli 3 的设计原则是“0配置”，移除的配置文件根目录下的，build和config等目录
  vue-cli 3 提供了 vue ui 命令，提供了可视化配置，更加人性化
  移除了static文件夹，新增了public文件夹，并且index.html移动到public中

# vue-cli 3 如何修改配置文件呢？
  1. 终端启动配置服务器：vue ui 在图形化界面导入项目配置并修改保存
  2. 其实配置文件是被存放到 \node_modules\@vue\cli-service  可以到里面修改
  3. 在当前项目文件根目录下创建 vue.config.js(固定命名) 通过module.exports = {} 导出自定义配置，并会自动和默认的隐藏配置进行合并。通过这种方式对配置扩展。

```
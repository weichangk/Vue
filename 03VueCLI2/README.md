# 03vuecli2

> vue cli2 test

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
Nginx 部署运行

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

``` bash
# 1. 什么是Vue CLI
  在开发大型项目, 必然需要使用Vue CLI
  使用Vue.js开发大型应用时，我们需要考虑代码目录结构、项目结构和部署、热加载、代码单元测试等事情。
  如果每个项目都要手动完成这些工作，那无疑效率比较低效，所以通常我们会使用一些脚手架工具来帮助完成这些事情。

  CLI是Command-Line Interface, 翻译为命令行界面, 但是俗称脚手架
  Vue CLI是一个官方发布 vue.js 项目脚手架
  使用 vue-cli 可以快速搭建Vue开发环境以及对应的webpack配置

# 2. Vue CLI使用前提 - Node
  Node环境要求8.9以上或者更高版本
  node --version 检查版本

  什么是NPM呢?
    安装Node会自带
    NPM的全称是Node Package Manager
    是一个NodeJS包管理和分发工具，已经成为了非官方的发布Node模块（包）的标准。
    经常使用NPM来安装一些开发过程中依赖包.

  cnpm安装
    由于国内直接使用 npm 的官方镜像是非常慢的，这里推荐使用淘宝 NPM 镜像。
    你可以使用淘宝定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    这样就可以使用 cnpm 命令来安装模块了：
    cnpm install [name]

# 3. Vue CLI使用前提 - Webpack
  Vue.js官方脚手架工具就使用了webpack模板
  对所有的资源会压缩等优化操作
  它在开发过程中提供了一套完整的功能，能够使得我们开发过程中变得高效。
  Webpack的全局安装 npm install webpack -g
  检查安装 webpack --version

# 4. 安装Vue CLI脚手架
  npm install -g @vue/cli
  检查安装 vue --version
  注意：上面安装的是Vue CLI3的版本，如果需要想按照Vue CLI2的方式初始化项目时不可以的。
  为了兼容CLI2的版本需要拉取2.x模板 npm install -g @vue/cli-init  这样既可以使用cli3也可以使用cli2了

  Vue CLI2初始化项目 vue init webpack my-project
  Vue CLI3初始化项目 vue create my-project

# 5. Vue CLI2详解 
  ? Project name 03vuecli2    vue init webpack my-project 会根据my-project创建一个文件夹，该名称也作为默认项目名称，但不能包含大写字母等。
  ? Project description vue cli2 test   项目描述
  ? Author weichangk    作者信息
  ? Vue build standalone    ？？？
  ? Install vue-router? No    路由
  ? Use ESLint to lint your code? No    编码规范
  ? Set up unit tests No    单元测试
  ? Setup e2e tests with Nightwatch? No   自动化测试框架
  ? Should we run `npm install` for you after the project has been created? (recommended) npm   使用npm安装

# 6. 目录结构详解
  build 和 config    webpack 相关配置
  node_modules       依赖node相关模块
  src                写代码的地方
  .babelrc           ES代码转换相关配置
  .editorconfig      项目文本相关配置
  .gitignore         git仓库忽略文件配置
  .postcssrc.js      CSS相关转换配置

  
该03vuecli2 vue项目就是通过cli2搭建的。
```

# webpack

## webpack常用命令参数

```
  --watch 自动监听文件变化
  --progress 显示大包的进度信息
  --module-bind 指定不同文件需要使用的loader
  --display-modules 打包使用的模块
  --display-reasons 为什么打包这个文件
  --colors 打包的文字提示是彩色的
  --config 指定配置文件
```

## 创建工程文件夹－crreate project folder

```
  mkdir webpack-demo  // create project folder named webpack-demo
   cd webpack-demo // enter the folder
   yarn init -y or npm init - y // use yarn or npm to initial the project
  touch index.js // create a js file named index
  atom ./  //use the atom to open the project
```
## 安装webpack－install

```
// install the webpack and webpack-cli
  yarn add webpack webpack-cli --save-dev

  or

  npm install webpack webpack-cli --save-dev

  // 现在webpack的ci集成环境已经是一个独立的模块，所以需要安装webpack-cli
```

## loaders

- js 解析js文件需要使用babel

```
  yarn add babel-core babel-loader babel-preset-env --save-dev
```

- css 解析css文件需要使用css-loader style-loader

```
  yarn add css-loader style-loader --save-dev
  // css-loader 是为了读取入口文件中使用require/import等方式引入css后缀的文件
  // style-loader 是为了将经过css-loader解析后的模块插入到html文件的style标签中 
```

1) 可以使用行内的方式引入loader;

```
   require(style-loader!css-loader!./style.css);
   // 注意各个loader之间需要用！隔开
   // loader的加载顺序是从右向左
``` 

2) 也可以在webpack的cli命令--module-bind,编译文件的时候指定loader

```
  webpack hello.js --module-bind "css=style-loader±csss-loader"
  // 使用webpack大包hello.js文件中遇见css文件就使用后面的loader对css文件进行解析并插入到style标签
```

3) 当然最推荐的方式还是在configuration文件中指定每一种文件的loader
## 配置webpack － configuration

- webpack.config.js webpack默认会从执行脚本的根目录下着webpack.config.js对webpack进行配置
- 如果跟路径下的webpack配置文件不叫webpack.config.js，可以在命令行中通过--config filenam.js对默认配置文件的名字进行更改
- 例如webpack --watch --config webpack.dev.config.js，就会执行跟路径下的webpack.dev.config,js的配置文件
```
  module.exports = {

    // webpack打包的入口文件
    entry:'./src/js/index.js',  

    // webpack打包生成文件的路径和文件命，[name]可以指代入口文件的文件名
    output:{
      path:'./dist',
      filename:'bundle.js'
    },
    plugins:[
      new htmlwebpackplugin({
        template:'./index.html', // 引用跟路径下的index.html生成新的模版
        filename:'index-[hash].html', // 新生成的html文件名字
        inject:'head' // 打包后的js文件动态插入html文件的head还是body
      })
    ]
  }
```
- context: 基础目录
- entry: 入口文件
  
  1)单页面应用可以传入一个string，指定单一的打包入口
  
  ```
     entry:'./src/index.js'
     ,output:{
       path:'./dist',
       filename:'bundle.js',
       publicPath: 'https://10.179.0.1' // 可以指定打包后的服务器地址路径，一般用于上线发布
     }
     // 当是单入口，输出的文件可以写死成一个bundle，这样就会都打包到bundle.js文件中
  ```
  2)传入一个数组，可以指定多个文件入口
  
  ```
    entry:[
      './src/index.js' // 指定自定义的js文件
      './thirdPart/lodash.js' 
    ]，
    output:{
      path:'./dist',
      filename:'[name].js'
    }
    // 如果是多入口文件，打包后的文件名写死就会发生覆盖，所以使用[name],[hash]或[chunkhash]占位符，会动态生成
    // hash是本地打包的哈希值,chunkhash是单独打包的哈希值，只有当文件发生变化的时候hash值才会变
  ```

  - plugins: 插件，需要在头部使用require的方式引入 var htmlWebpackPlugin = require('html-webpack-plugin');

  1.html-webpack-plugin: 因为多文件打包后生成的文件就不是写死的bundle.js文件了，所以在html模版中也不可能写死，所以通过插件动态生成引入打包文件的html模板
    
    1) 可以使用template配置生成的html文件的模版
    
    2) 可以通过inject属性指定打包后的js文件插入到head还是body

    3) 可以指定新生成的html文件的名字

    4）可以引入插件的其它属性，例如压缩，具体需要看官网的api

    4）可以给模版传入参数，然后在html的模板中通过ejs的语法引入

    ```
      plugins:[
        new htmpWebpackPlugin({
          template:__dirname + '/index.html'，
           //在根目录下的html为模版生成新的引入打包js的html文件
           title:'webpack is good'，
           minify:{ // 压缩
             removeConments:true, // 去处备注
             collapseWhitespace:true // 去掉空格
           },
           // chunks和excludechunks主要用于多页面应用生成多个html，然后各个html需要引入不同的
           // chunks
           chunks:['a','index']， // 可以指定生成的html模版中需要引入的js的chunk
           excludeChunks:['b','c'] // 可以指定生成的html中不引入的chunk
        })
      ]


      //index.html

      <head>
        <title><%= htmlWebpackPlugin.options.title%></title>
      </head>
    ```

    5) 在html模板中使用ejs的写法，语法为如果需要赋值使用<%= xxx %>,执行逻辑为<% xxx %>

    ```
      // 例如遍历htmlWebpackPlguin 插件里面files和options属性
         <% for (var key in htmlWebpackPlugin.files){ %>
           <%= key %>:<%= JSON.stringify(htmlWebpackPlugin.files[key]) %>
         <% } %>


          <% for (var key in htmlWebpackPlugin.options){ %>
            <%= key %>:<%= JSON.stringify(htmlWebpackPlugin.options[key]) %>
          <% } %>
    ```

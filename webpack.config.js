const path = require('path'); // nodejs的path模块

module.exports = {
    mode: 'development',
    entry: __dirname + '/src/js/index.js', // webpack打包的入口文件
    output: {
        path: path.resolve(__dirname, 'dist'), // webpack大包输出路径
        filename: 'bundle.js' // webpack大包输出的文件名称
    },
    module: { // 使用webpack的loader，webpack4已经不需要json loader解析json文件了，已经内置了
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /(\.js|\.jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["env", "react"]
                        }
                    }
                ]
            }
        ]
    },
    devServer: { // 创建一个服务器拉起打包后的静态资源
        // contentBase: './dist  默认是监听根目录下的index.html，使用contentBase可以修改监听的文件目录
        inline: true, // 实时刷新
        historyApiFallback: true, // 味了但单页面应用。设置了true就不发生页面跳转
        port: 3000 // k可以设置server的端口，默认是8080
    }
}
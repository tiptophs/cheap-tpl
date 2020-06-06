//webpack 基础配置数据 (webpack是node开发的，所以这里要用node语法)

//引入node中path路径函数，他可以将相对路径转化为绝对路径
const path = require('path')
//引入HtmlWebpackPlugin插件，他会根据指定的html模板生成一个内存中的模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
//引入css处理插件，将html模板内的style样式替换成link的形式
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//引入css优化插件，让打包的css文件压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//引入uglify
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//引入vue-laoder处理vue组件
//const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    //开发模式(production生产模式， development开发模式)
    mode:'production',
    //开发服务器的配置
    devServer:{
        port:3000,  //端口
        progress:true,  //打包显示进度条
        contentBase: './dist',  //内存打包的地址
        //open: true,  //自动在浏览器内打开
        compress:true   //Gzip压缩
    },
    //入口地址
    entry: ['./src/main.js'],
    //输出地址
    output:{
        filename:'bundle.[hash:8].js',    //打包后的文件名称,[hash:8]生成版本hash，8设置长度
        path: path.resolve(__dirname, 'dist')     //输出路径必须是一个绝对路径
    },
    //webpack4.0 新增优化项目, 这里的优化项在production环境下才生效
    optimization:{
        minimizer:[
            new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin({
                parallel: true,     //并发打包
                sourceMap: true,    //源码映射
                cache:true          //启用缓存
            }),
        ]    
    },
    //数组，用于存放所有的webpack插件，插件是一个类所以要大写，并且要new
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html',    //指定依赖的模板文件
            filename: 'index.html',             //生成的文件名称
            minify: {                           //html的处理
                removeAttributeQuotes:true,     //删除多余的双引号
                collapseWhitespace:true,        //html压缩成一行
            },
            hash:true                           //hash
        }),
        //css生成link的形式引入
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash:8].css'
        })
        //vue-plugin
        //new VueLoaderPlugin()
    ],
    //模块，用于处理相应文件的loader
    module:{
        rules: [    //规则
            //css-loader 解析@import这种语法(css内部应用css文件)
            //style-loader 把css插入到head标签中
            //loader特定希望单一化
            //loader的顺序为从下到上执行
            {
                //这里可以有 less less-loader node-sass sass-loader stylus stylus-loader
                test: /\.less$/,
                use: [
                //   {
                //     loader:'style-loader',
                //     options:{
                //         insert:'top'    //将样式插在最顶部位置，优先级最低
                //     }
                //   },
                MiniCssExtractPlugin.loader,
                  //'style-loader',   //这里也可以采用对象的形式，可以传递额外的参数
                  'css-loader',
                  'postcss-loader',   //自动添加前缀
                  'less-loader'  
                ]          //这里可以是字符串也可以是数组，多个loader采用数组的方式，处理方式为从右向左执行
            },
            //处理js文件
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader',
                    options:{   //用babel-loader把es6->es5,也可以写入到外部文件babel.config.js
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'), //包含文件
                exclude: /node_modules/ //排除目录
            },
            //验证js文件
            // {
            //     test:/\.js$/,
            //     use:{
            //         loader:'eslint-loader',
            //         options:{
            //             enforce: 'pre' //previous前， post后
            //         }
            //     }
            // }
            // {
            //   test: /\.vue$/,
            //   loader: 'vue-loader'
            // }
        ]
    }
    
}
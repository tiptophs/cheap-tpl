const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // 模式，默认两种 production和development
  entry: './src/index.js', // 入口，从哪个文件开始打包
  output: { // 出口
    filename: 'bundle.[hash:5].js', // 打包后的文件名
    path: path.resolve(__dirname, './build'), // 路径必须是一个绝对路径
  },
  devServer: { // 开发服务器的配置
    port: 3000, // 端口
    progress: true, // 打包时显示进度条
    contentBase: './build', // 指定目录做为静态服务
    compress: true, // 启用gzip压缩
  },
  plugins: [ // 数组，放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定要打包的模板
      filename: 'index.html', // 打包后生成的文件
      minify: { // 压缩操作
        removeAttributeQuotes: true, // 删除模板中的双引号
        collapseWhitespace: true, // 将模板压缩成一行
      },
      hash: true, // 模板中引用的js文件带哈希戳
    }),
  ],
};

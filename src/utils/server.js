//node express

let express = require('express');
let app = express();

//后端开启webpack，这样两者都在同一个端口
//let webpack = require('webpack');
//中间件
//let middle = require('webpack-dev-middleware');
//配置
//let config = require('../webpack.config.js');
//编译
//let compiler = webpack(config);
//采用
//app.use(middle(compiler))


//定义api
app.get('/user', (req, res)=>{
    res.json({
        name: '接口测试'
    })
})

//监听端口
app.listen(3000)
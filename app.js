//  module.exports = app;
const express = require('express');
//const getIPAdress = require('./Utils/getIPAdress.js')(); // 自定义模块用来回去本机的ip地址
const app = express();
let Mock = require('mockjs');        //引入mock模块
let MockRandom=Mock.Random;
app.all('/api/*', function(req, res, next) { // 允许客户端进行跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const test = require('./detail/comment.js'); // 获取mock 数据源
app.get('/api/:star', function(req, res) {
    // res.send(test.filter(item => {
    //     return item.star === parseInt(req.params['star']);  // ES6 写法进行 客户端传入id进行匹配
    // }));
    res.send(test[req.params['star']])
});
app.get('/test/pos', function(req, res) {
    /**
     * mockjs中属性名‘|’符号后面的属性为随机属性，数组对象后面的随机属性为随机数组数量，正则表达式表示随机规则，+1代表自增
     */
    res.json(Mock.mock({
        "status": 200,
        "data|1-9": [{
            'id|+1': 10000,
            'title': '@ctitle(5, 15)',
            'desc': '@cparagraph(2, 5)',
            'img': MockRandom.image('200x100', '#4A7BF7', '@name book'),//经测试MockRandom.dataImage()无效,看了下源码，是有该函数的 - 下的mockjs@1.0.1-beta3包
            'time': MockRandom.now('yyyy-MM-dd')
        }]
    }));
});
app.get('*', function(req, res) {  // 不满足url进行重定向
    res.redirect('/api');
});
const server = app.listen(3009, function() { // 监听服务端口 输出配置信息
    const host = server.address().address;
    const port = server.address().port;
    console.log('Mork Server address http//:'+ port+'/api');
});
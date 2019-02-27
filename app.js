const express = require("express");
const app = express();

const chalk = require("chalk");
const log = console.log;

const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const ip = require("ip"); //获取ip地址


const CONFIG = require('./server/config.js');
const ROUTER = require('./server/router/router.js');

app.use(express.static(CONFIG.STATIC_DIR));
app.use(express.static(CONFIG.SHARE_DIR));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  // 让options尝试请求快速结束
    else
        next();
})

app.use('/',ROUTER);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(CONFIG.PORT_NUM,()=>{
    log(chalk.green(`serve start success`));
    log(chalk.green(`ip 1：${CONFIG.BASE_PATH}`));
    log(chalk.green(`ip 2：${CONFIG.BASE_PATH_v2}`));
})
const express = require("express");
const app = express();

const chalk = require("chalk");
const log = console.log;

const fs = require("fs");
const path = require("path");
const ip = require("ip"); //获取ip地址


const CONFIG = require('./server/config.js');
const ROUTER = require('./server/router/router.js');

app.use(express.static(CONFIG.STATIC_DIR));
app.use(express.static(CONFIG.SHARE_DIR));

app.use('/',ROUTER);

app.listen(CONFIG.PORT_NUM,()=>{
    log(chalk.green(`serve start success , ip：${CONFIG.BASE_PATH}`));
})
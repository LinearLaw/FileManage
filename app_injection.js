const fs = require("fs");
const ip = require("ip"); //获取ip地址

const chalk = require("chalk");
const log = console.log;

const CONFIG = require('./server/config.js');

// 注入localhost ip
let writeDir = `./webapp/v2/public/base-path.js`;
let writeStr = `var BASE_PATH = "${CONFIG.BASE_PATH}";`;
let writeOptions = {flag:'w',encoding:'utf-8',mode:'0666'};

try{
    fs.writeFileSync(writeDir,writeStr);
    log(chalk.green(`ip地址文件注入成功`));
} catch(err){
    log(chalk.red(`ip地址文件注入失败`));
}

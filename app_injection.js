const fs = require("fs");
const ip = require("ip"); //获取ip地址

const chalk = require("chalk");
const log = console.log;

const CONFIG = require('./server/config.js');

/**
 * @description 注入localhost ip
 */
// production
let writeDir = `./webapp/v2/public/base-path.js`;
let writeStr = `var BASE_PATH = "${CONFIG.BASE_PATH}";`;
let writeOptions = {flag:'w',encoding:'utf-8',mode:'0666'};

try{
    fs.writeFileSync(writeDir,writeStr);
    log(chalk.green(`prod-ip注入成功：${CONFIG.BASE_PATH}`));
} catch(err){
    log(chalk.red(`prod-ip注入失败：${CONFIG.BASE_PATH}`));
}

// development
let moduleDir = `./webapp/v2/public/base-path-dev.js`;
let moduleStr = `module.exports = { BASE_PATH : "${CONFIG.BASE_PATH}" }`;
try{
    fs.writeFileSync(moduleDir,moduleStr);
    log(chalk.green(`dev-ip注入成功：${CONFIG.BASE_PATH}`));
} catch(err){
    log(chalk.red(`dev-ip注入失败：${CONFIG.BASE_PATH}`));
}

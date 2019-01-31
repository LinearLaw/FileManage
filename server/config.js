const ip = require("ip"); //获取ip地址

const PORT_NUM = 8008; // 端口号
const CURRENT_IP = ip.address(); // ip地址
const STATIC_DIR = `./webapp/v2/dist`; // webapp基础路径
const SHARE_DIR = `./FileContainer`; // 静态文件资源基础路径
const BASE_PATH = `http://${CURRENT_IP}:${PORT_NUM}`;

module.exports = {
    PORT_NUM,
    CURRENT_IP,
    STATIC_DIR,
    SHARE_DIR,
    BASE_PATH,
}
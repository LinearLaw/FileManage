const ip = require("ip"); //获取ip地址
const tools = require("./tools.js")

const PORT_NUM = 8008; // 端口号
const CURRENT_IP = ip.address(); // ip地址
const LAN_IP = tools.getGlobalIp()['ipv4'];

const STATIC_DIR = `./webapp`; // webapp基础路径
const SHARE_DIR = `D:/download/`; // 静态文件资源基础路径
const BASE_PATH = `http://${LAN_IP}:${PORT_NUM}`;
const BASE_PATH_v2 = `http://${CURRENT_IP}:${PORT_NUM}`;

module.exports = {
    PORT_NUM,
    CURRENT_IP,
    LAN_IP,
    STATIC_DIR,
    SHARE_DIR,
    BASE_PATH,
    BASE_PATH_v2,
}
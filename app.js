const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const ip = require("ip"); //获取ip地址

const TOOLS = require("./server/tools.js");


// 基础配置
const PORT_NUM = 8008; // 端口号
const CURRENT_IP = ip.address(); // ip地址
const STATIC_DIR = `./webapp/v1`; // webapp基础路径
const SHARE_DIR = `./FileContainer`; // 静态文件资源基础路径

const BASE_PATH = `http://${CURRENT_IP}:${PORT_NUM}`;

// 注入localhost ip
let writeDir = `./webapp/v1/assets/base-path.js`;
let writeStr = `var BASE_PATH = "${BASE_PATH}";`;
let writeOptions = {flag:'w',encoding:'utf-8',mode:'0666'};
fs.writeFile(writeDir,writeStr,writeOptions,(err)=>{
    if(!err){ console.log(`ip地址文件注入成功`); }
});

app.use(express.static(STATIC_DIR));
app.use(express.static(SHARE_DIR));

// 监听请求
app.get("/file",(req,res)=>{
    console.log(`收到了来自${TOOLS.getReqRemoteIp(req)} ${req.url}的请求`);
    try{
        TOOLS.getFile(req.query.dir).then((files)=>{
            let arr = [];
            files.map((item,index)=>{
                let direction = path.resolve(__dirname ,SHARE_DIR + req.query.dir + "/"+item);
                let stat = fs.statSync(direction);
                if(stat.isDirectory()){
                    //是文件
                    arr.push({
                        fileName:item,
                        isFile:false
                    })
                }else{
                     //是文件夹
                    arr.push({
                        fileName:item,
                        isFile:true
                    })
                }
            })
            res.send({
                basePath:`${req.query.dir}`,
                hostName:`${BASE_PATH}`,
                data:arr,
                status:"success"
            });
        });
    }catch(err){
        console.log(err);
    }
    

});



app.listen(PORT_NUM,()=>{
    console.log(`ip：${BASE_PATH}`);
})
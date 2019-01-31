const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const ip = require("ip"); //获取ip地址

const TOOLS = require("./server/tools.js");

app.use(express.static("./webapp/v1"));
app.use(express.static("./FileContainer"));

// 基础配置
const PORT_NUM = 8008;
const CURRENT_IP = ip.address();

// 注入localhost ip
let writeDir = `./webapp/v1/assets/base-path.js`;
let writeStr = `var BASE_PATH = "http://${CURRENT_IP}:${PORT_NUM}";`;
let writeOptions = {flag:'w',encoding:'utf-8',mode:'0666'};
fs.writeFile(writeDir,writeStr,writeOptions,(err)=>{
    if(!err){
        console.log(`文件注入成功`);
    }
});

// 监听请求
app.get("/file",(req,res)=>{
    console.log(`收到了来自${TOOLS.getReqRemoteIp(req)} ${req.url}的请求`);
    try{
        TOOLS.getFile(req.query.dir).then((files)=>{
            let arr = [];
            files.map((item,index)=>{
                let direction = path.resolve(__dirname ,"./FileContainer"+req.query.dir + "/"+item);
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
                hostName:`${CURRENT_IP}:${PORT_NUM}`,
                data:arr,
                status:"success"
            });
        });
    }catch(err){
        console.log(err);
    }
    

});



app.listen(PORT_NUM,()=>{
    console.log(`ip：http://${CURRENT_IP}:${PORT_NUM}`);
})
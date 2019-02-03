const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

const chalk = require("chalk");
const log = console.log;

const CONFIG = require('../config.js');
const TOOLS = require("../tools.js");

// 监听请求
router.get("/file",(req,res)=>{
    log(chalk.blue(`收到了来自${TOOLS.getReqRemoteIp(req)} ${req.url}的请求`));
    let reqDir = path.resolve(__dirname,CONFIG.SHARE_DIR + req.query.dir)
    TOOLS.getFile(reqDir).then((files)=>{
        let arr = [];
        // try{
        files.map((item,index)=>{
            try{
                let direction = path.resolve(__dirname,'../../' ,CONFIG.SHARE_DIR + req.query.dir + "/"+item);
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
            }catch(err){
                // 有一些文件无权限访问
                log(index,chalk.red(err))
            }
        })
        
        res.send({
            basePath:`${req.query.dir}`,
            hostName:`${CONFIG.BASE_PATH}`,
            list:arr,
            status:"success"
        });
    });
    
});


module.exports = router;
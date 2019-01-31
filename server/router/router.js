const express = require('express');
const router = express.Router();

const chalk = require("chalk");
const log = console.log;

const CONFIG = require('../config.js');
const TOOLS = require("../tools.js");



// 监听请求
router.get("/file",(req,res)=>{
    log(chalk.blue(`收到了来自${TOOLS.getReqRemoteIp(req)} ${req.url}的请求`));
    try{
        TOOLS.getFile(req.query.dir).then((files)=>{
            let arr = [];
            files.map((item,index)=>{
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
            })
            res.send({
                basePath:`${req.query.dir}`,
                hostName:`${CONFIG.BASE_PATH}`,
                data:arr,
                status:"success"
            });
        });
    }catch(err){
        log(chalk.red(err));
    }
});


module.exports = router;
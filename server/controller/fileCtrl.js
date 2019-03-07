const path = require('path');
const fs = require('fs');

const chalk = require("chalk");
const log = console.log;

const CONFIG = require('../config.js');
const TOOLS = require("../tools.js");

// 1、获取服务所在文件列表
exports.getFileList = (req,res)=>{
    log(chalk.blue(`${TOOLS.getTime()} : ${TOOLS.getReqRemoteIp(req)} ${req.url}`));

    let reqDir = path.resolve(__dirname,`${CONFIG.SHARE_DIR}${req.query.dir}`)
    TOOLS.getFile(reqDir).then((files)=>{
        let arr = [];
        // try{
        files.map((item,index)=>{
            try{
                let direction = path.resolve(__dirname,'../../' ,`${CONFIG.SHARE_DIR}${req.query.dir}/${item}`);
                let stat = fs.statSync(direction);
                if(stat.isDirectory()){
                    //是文件夹
                    arr.push({
                        fileName:item,
                        isFile:false
                    })
                }else{
                     //是文件
                    arr.push({
                        fileName:item,
                        type:path.extname(item).replace('.',''),
                        size:TOOLS.getByte(stat.size),
                        isFile:true,
                    })
                }
            }catch(err){
                /* 有一些文件无权限访问 */
                log(index,chalk.red(err))
            }
        })
        
        res.send({
            basePath:`${req.query.dir}`,
            hostName:`${CONFIG.BASE_PATH}`,
            list:arr,
            status:"success",
            code:200
        });
    }).catch((err)=>{
        res.send({
            status:'error',
            code:-1,
            msg:'File not exist or folder unlegal'
        })
    });
}

// 以文本形式读取文件
// 限制大小10MB；
const limitSize = 1024*1024*2;
exports.getContentAsText = (req,res)=>{
    log(chalk.blue(`${TOOLS.getTime()} : ${TOOLS.getReqRemoteIp(req)} ${req.url}`));
    let direction = path.resolve(__dirname , '../../' , `${CONFIG.SHARE_DIR}${req.query.dir}`);
    let stat = fs.statSync(direction);
    if(stat.size > limitSize){
        res.send({
            code:-1,
            status:'error',
            msg:'文本查看仅支持最大2MB的文件。'
        });
        return;
    }
    try{
        let re = fs.readFileSync(direction,{encoding: 'utf8'});
        res.send({
            code:200,
            status:'success',
            content:re
        })
    }catch(err){
        res.send({
            code:-1,
            status:'error',
            msg:err
        });
        return;
    }
}

// 以二进制流形式读取文件
exports.getContentAsBlob = (req,res)=>{
    log(chalk.blue(`${TOOLS.getTime()} : ${TOOLS.getReqRemoteIp(req)} ${req.url}`));
    let direction = path.resolve(__dirname , '../../' , `${CONFIG.SHARE_DIR}${req.query.dir}`);
    let name = req.query.name;
    let stat = fs.statSync(direction);
    fs.exists(direction,function(exist) {
        if(exist){
            log(chalk.blue("Stream start."));
            // let head = {
            //     'Content-Length': stat.size,
            //     'Content-Type': 'video/mp4'
            // };
            // res.writeHead(200, head);
            
            let readStream = fs.createReadStream(direction);
            readStream.on('close', function() {
                res.end();
                log(chalk.blue("Stream finished."));
            });
            readStream.pipe(res);
        }else{
            res.set("Content-type","text/html");
            res.send({
                code:-1,
                status:'error',
                msg:"file not exist!"
            });
            res.end();
        }
    });
}
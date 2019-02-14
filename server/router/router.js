const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const chalk = require("chalk");
const log = console.log;

const CONFIG = require('../config.js');
const TOOLS = require("../tools.js");

// 获取服务所在文件列表
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
    });
});




// 获取远端服务所在连接下链接
router.get('/level1',(req,res)=>{
    if(!req.query.url){
        res.send({
            status:'error',
            code:'-1',
            msg:'url is needed'
        });
        return;
    }
    let target = req.query.url;
    request.get({
        encoding:'utf-8',
        url:target
    },(err,response,body)=>{
        if(err){
            res.send({
                status:'error',
                code:'-1',
                msg:err
            });
            return;
        }
        try{
            let $ = cheerio.load(response.body);
            let arr = [];
            $('img').map((index,item)=>{
                arr.push($(item).attr('src'));
            })
            res.send({
                status:'success',
                code:200,
                img:arr
            })
        }catch(err){
            res.send({
                msg:err,
                status:'error',
                code:'-1'
            });
            return;
        }
    })
});




function getOrigin(url){
    let a = url.replace('http://','').replace('https://','').split('/');
    let t = '';
    a.map((_it,_in)=>{
        if(_it && _in < a.length-1){
            t = `${t}/${_it}`;
        }
    });
    return `http:/${t}`;
}

// 二次链接
router.get('/level2',(req,res)=>{
    if(!req.query.url){
        res.send({
            status:'error',
            code:'-1',
            msg:'url is needed'
        });
        return;
    }
    let target = req.query.url;
    request.get({
        encoding:'utf-8',
        url:target
    },(err,response,body)=>{
        if(err){
            res.send({
                status:'error',
                code:'-1',
                msg:err
            });
            console.log(err);
            return;
        }
        let origin = getOrigin(target);
        try{
            let $ = cheerio.load(response.body);
            let arr = [];
            $('h3').map((index,item)=>{
                let s = $(item).find('a').attr('href');
                arr.push(`${origin}/${s}`);
            })
            res.send({
                status:'success',
                code:200,
                img:arr
            })
        }catch(err){
            res.send({
                msg:err,
                status:'error',
                code:'-1'
            });
            return;
        }
    })
});


module.exports = router;
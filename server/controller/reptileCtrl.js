const request = require('request');
const cheerio = require('cheerio');

const chalk = require("chalk");
const log = console.log;

exports.getLevel1 = (req,res)=>{
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
}

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
exports.getLevel2 = (req,res)=>{
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
}
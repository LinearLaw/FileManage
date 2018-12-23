const express = require("express");
const app = express();

const os = require("os")
const fs = require("fs");
const path = require("path");

const PORT_NUM = 8008;
const TOOLS = {
    getFile(filePath){
        return new Promise((resolve,reject)=>{
            fs.readdir(path.resolve(__dirname,'./FileContainer/'+filePath), function(err, files) {
                if (err) {
                    reject(err);
                    throw err;
                }
                // files是一个数组,每个元素是此目录下的文件或文件夹的名称
                resolve(files);
            });
        },(err)=>{console.log(err)});
    },
    //获取当前局域网IP
    getLocalIp(){
        var map = [];  
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {  
            if(ifaces[dev][1].address.indexOf('192.168') != -1) {  
                return ifaces[dev][1].address;  
            }  
        }    
        return map;
    },
    //获取请求来源的IP
    getReqRemoteIp(req){
        return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    }
}

app.use(express.static("./webapp"));
app.use(express.static("./FileContainer"));

app.get("/file",(req,res)=>{
    // console.log(req.query);
    // console.log(TOOLS.getLocalIp());
    console.log(`收到了来自${TOOLS.getReqRemoteIp(req)} ${req.url}的请求`);
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
            basePath:`${TOOLS.getLocalIp()}:${PORT_NUM}`,
            data:arr,
            status:"success"
        });
    });

});



app.listen(PORT_NUM,()=>{
    console.log(`project prot ${PORT_NUM}`);       
})
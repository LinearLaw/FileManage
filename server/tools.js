const os = require("os")
const fs = require("fs");
const path = require("path");
 
module.exports = {
    getFile(filePath){
        return new Promise((resolve,reject)=>{
            fs.readdir(path.resolve(__dirname,'../FileContainer/'+filePath), function(err, files) {
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
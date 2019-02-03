const os = require("os")
const fs = require("fs");
const path = require("path");
 
module.exports = {
    getFile(filePath){
        return new Promise((resolve,reject)=>{
            fs.readdir(filePath, function(err, files) {
                if (err) {
                    reject(err);
                    throw err;
                }
                // files是一个数组,每个元素是此目录下的文件或文件夹的名称
                resolve(files);
            });
        },(err)=>{console.log(err)});
    },
    // 获取当前局域网IP
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
    // 获取当前局域网IP * 2
    getGlobalIp(){
        let hostName = os.hostname();
        let allLinks = os.networkInterfaces();
        let ipv4,mac;
        let findSignal = false;
        Object.getOwnPropertyNames(allLinks).map((item, index) =>{
            if(findSignal == true){
                return;
            }
            allLinks[item].map((_it,_in)=>{
                if(findSignal == true){
                    return;
                }
                if(_it['family'] == 'IPv4' && _it['address'] != '127.0.0.1'){
                    ipv4 = _it['address'];
                    mac = _it['mac'];
                    findSignal = true;
                }
            })
        })
        return {ipv4,mac}
    },
    //获取请求来源的IP
    getReqRemoteIp(req){
        return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    }
}
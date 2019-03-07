const os = require("os")
const fs = require("fs");
const path = require("path");
 
module.exports = {
    getFile(filePath){
        return new Promise((resolve,reject)=>{
            fs.readdir(filePath, function(err, files) {
                if (err) {
                    reject(err);
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
            if(item.indexOf('VMware') != -1){
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
    },
    getByte(limit){
        let size = '';
        if( limit < 0.1 * 1024 ){ //如果小于0.1KB转化成B  
            size = limit.toFixed(2) + "B";    
        }else if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB  
            size = (limit / 1024).toFixed(2) + "KB";              
        }else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB  
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";  
        }else{ //其他转化成GB  
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";  
        }  
          
        var sizestr = size + "";   
        var len = sizestr.indexOf("\.");  
        var dec = sizestr.substr(len + 1, 2);  
        if(dec == "00"){//当小数点后为00时 去掉小数部分  
            return sizestr.substring(0,len) + sizestr.substr(len + 3,2);  
        }  
        return sizestr;
    },
    getTime(){
        let a = new Date();
        return `${a.toLocaleDateString()} ${a.toLocaleTimeString()}`;
    }
}
const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

app.use(express.static("./webapp"));
app.use(express.static("./FileContainer"));

app.get("/file",(req,res)=>{
    console.log(req.query);
    fileCtrl.getFile(req.query.dir).then((files)=>{
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
            basePath:req.query.dir,
            data:arr,
            status:"success"
        });
    });

});

const fileCtrl = {
    getFolder(filePath){

    },
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
    }
}


app.listen(8008,()=>{
    console.log("project prot 8008");       
})
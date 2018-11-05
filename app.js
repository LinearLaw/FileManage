const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

app.use(express.static(__dirname+"./webapp"));

app.get("/file",(req,res)=>{
    console.log(req.query);
    fileCtrl.getFile(req.query.dir).then((files)=>{
        res.send({
            basePath:req.query.dir,
            data:files,
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
                console.log(files);
                resolve(files);
            });
        },(err)=>{console.log(err)});
    }
}


app.listen(8008,()=>{
    console.log("project prot 8008");       
})
const express = require("express");

const app = express();

app.use(express.static(__dirname+"./webapp"));




app.listen(8008,()=>{
    console.log("project prot 8008");       
})
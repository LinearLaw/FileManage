console.log(`server run in type ${process.env.NODE_ENV}`);
let baseUrl = "";
switch(process.env.NODE_ENV){
    case "alpha":
        baseUrl = "/api";
        break;
    case "production":
        baseUrl = window.BASE_PATH;
        break;
}
export default {
    serverHost:baseUrl,          //dev 
}

import axios from "axios";
import qs from "qs";
import utils from "../utils/utils.js";
import {Message} from "element-ui";
import router from '@/router/router.js'

//拦截器
axios.interceptors.response.use((res,req)=>{
    return res;
}, (err) => {
    return Promise.reject(err);
});

let bodyDefault = {
    body:{},
    header:{}
}
let contentType = {
    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
}
export const request = {
    get:(u,obj=bodyDefault)=>{
        let header = Object.assign(contentType,obj.header);
        let sendData = utils.url.objToUrlString(obj.body);
        return axios.get(`${u}${sendData}`,{headers:header});
    },
    post:(u,obj=bodyDefault)=>{
        let header = Object.assign(contentType,obj.header);
        let data = Object.assign({},obj.body);
        return axios({
            url:`${u}`,
            method:"post",
            data:qs.stringify(data),
            headers:header
        });
    }
}
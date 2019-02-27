
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

let contentType = {
    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
}
export const request = {
    get:(u,obj,config={})=>{
        let header = contentType;
        let sendData = utils.url.objToUrlString(obj);
        return axios.get(`${u}${sendData}`,{headers:header});
        return axios({
            url:`${u}${sendData}`,
            method:'get',
            headers:header,
            ...config
        });
    },
    post:(u,obj,config={})=>{
        let header = contentType;
        let data = Object.assign({},obj);
        return axios({
            url:`${u}`,
            method:"post",
            data:qs.stringify(data),
            headers:header,
            ...config
        });
    }
}
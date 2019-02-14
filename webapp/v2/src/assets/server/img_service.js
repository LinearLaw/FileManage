import {request} from "./request.js";
import config from '../../config/config.js';
const basePath = config.serverHost;

export const getImgList = (payload)=>request.get(`${basePath}/level1`,payload);
export const getImgList2 = (payload)=>request.get(`${basePath}/level2`,payload);
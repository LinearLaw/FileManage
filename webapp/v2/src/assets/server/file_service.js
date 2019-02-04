import {request} from "./request.js";
import config from '../../config/config.js';
const basePath = config.serverHost;

export const getFileList = (payload)=>request.get(`${basePath}/file`,payload);
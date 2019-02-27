import {request} from "./request.js";
import config from '../../config/config.js';
const basePath = config.serverHost;

export const getFileList = (payload,config={})=>request.get(`${basePath}/file`,payload,config);

export const getFileContent = (payload,config={})=>request.get(`${basePath}/fileAsText`,payload,config);

export const getBlobContent = (payload,config={})=>request.get(`${basePath}/fileAsBlob`,payload,config);
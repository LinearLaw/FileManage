import {request} from "./request.js";

const basePath = window.BASE_PATH;

export const getFileList = (payload)=>request.get(`${basePath}/file`,payload);
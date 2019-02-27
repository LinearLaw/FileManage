const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const chalk = require("chalk");
const log = console.log;

const CONFIG = require('../config.js');
const TOOLS = require("../tools.js");

const fileCtrl = require('../controller/fileCtrl.js');
const reptileCtrl = require('../controller/reptileCtrl.js');

// 1、文件服务
// 获取服务所在文件列表
router.get("/file",fileCtrl.getFileList);
router.get("/fileAsText",fileCtrl.getContentAsText);
router.get("/fileAsBlob",fileCtrl.getContentAsBlob);


// 2、爬虫服务
// 一次链接，获取远端服务所在连接下链接
router.get('/level1',reptileCtrl.getLevel1);

// 二次链接
router.get('/level2',reptileCtrl.getLevel2);


module.exports = router;
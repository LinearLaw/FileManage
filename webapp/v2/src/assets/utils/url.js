
/**
 * 关于url处理的工具
 * @function getParamFromUrl  传入url和name，返回在url中这个name对应的值
 * @function getUrlParam 传入url和name, 获取一段url中所有的key，以对象形式返回
 * @function objToUrlString 传入对象，返回格式化后的字符串 {a:123,b:456} => ?a=123&b=456
 */

export let url = {
    /**
     * 传入一段url，一段name，返回这个name对应的值
     */
    getParamFromUrl: function(url, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var ar = url.split("?");
        var r = ar[ar.length - 1].match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    /**
     * 获取一段url中所有的key，以对象形式返回
     * @param {*} sUrl url
     * @param {*} sKey 指定的key
     */
    getUrlParam(sUrl, sKey) {
        var obj = {};
        var index = sUrl.indexOf('?');
        if (index == -1) {
            if (sKey == undefined) {
                return obj;
            } else {
                return "";
            }
        }
        var queryString = (sUrl.split("?")[1]).split("#")[0];
        var query = queryString.split('&'); //分离出了所有参数
        for (var i = 0; i < query.length; i++) {
            var keyValue = query[i].split("=");
            var key = keyValue[0];
            var value = keyValue[1];
            if (value == "") {
                continue;
            }
            if (obj.hasOwnProperty(key)) {
                if (Array.isArray(obj[key])) {
                    obj[key].push(value);
                } else {
                    var val = obj[key];
                    obj[key] = [];
                    obj[key].push(val);
                    obj[key].push(value);
                }
            } else {
                obj[key] = value; //有新参数，直接添加
            }
        }
        if (sKey) {
            return obj[sKey] ? obj[sKey] : "";
        } else {
            return obj;
        }
    },
    /**
     * eg： {a:123,b:456} => ?a=123&b=456
     * @param {*} obj
     */
    objToUrlString(obj) {
        let str = "?";
        Object.getOwnPropertyNames(obj).map(function(item, index) {
            str = str + item + "=" + obj[item] + "&";
        });
        return str.slice(0, -1);
    },
    // 字符串"/"去重，生成新链接
    removeMultiple(str){
        let arr = str.split("/");
        let newStr = "";
        let newArr = [];
        arr.map(function(item,index){
            if(item){
                newStr += "/" + item;
                newArr.push(item)
            }
        });
        return {dir:newStr,url:newArr};
    },
    // 获取当前url下的上一层目录
    previewDir(dir){
        if(!dir || dir == "/"){
            return "/";
        }else{
            let dirNew = dir.substr(dir.length-1,1)=="/"?dir.slice(0,-1):dir;
            var arr = dirNew.split("/");
            var pre = "";
            arr.map(function(item,index){
                if(index>=arr.length - 1){
                    return;
                }else{
                    pre += item + "/";
                }
            });
            return pre;
        }
    },
}



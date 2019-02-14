export const cookie = {
    get: function(n) {
        var m = document.cookie.match(new RegExp("(^| )" + n + "=([^;]*)(;|$)"));
        return !m ? "" : decodeURIComponent(m[2])
    },
    set: function(name, value, hour, domain, path) {
        var expire = new Date();
        expire.setTime(expire.getTime() + (hour ? 3600000 * hour : 30 * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + value + "; expires=" + expire.toGMTString() + "; path=" + (path ? path : "/") + "; " + (domain ? ("domain=" + domain + ";") : "")
    },
    del: function(name, domain, path) {
        document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (path ? path : "/") + "; " + (domain ? ("domain=" + domain + ";") : "")
    }
};

//禁用number的滚轮事件
export const forbidMouseWheel = (e)=>{
    function _mousewheel(evt){
        var target = evt.target || evt.srcElement;
        evt = evt || window.event;  
        if (!!target && target.type === 'number') {               
            if(evt.preventDefault) {  
                // Firefox  
                evt.preventDefault();  
                evt.stopPropagation();  
            } else {  
                // IE  
                evt.cancelBubble=true;  
                evt.returnValue = false;
            }  
            return false;
        }
    }
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll',_mousewheel,false); 
    }
    window.onmousewheel = document.onmousewheel = _mousewheel;
}
/**
 * [19900000 → 19,900,000.00]
 */
export const parseMoney = (s)=>{
    if (!(s)) {return 0.00;}
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    var c = s.split(".")[0].split("").reverse();
    var e = s.split(".")[1];
    var t = "";
    for (var i = 0; i < c.length; i++) {
        t += c[i] + ((i + 1) % 3 == 0 && (i + 1) != c.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + e;
}

//判断传入字符串是否存在于类型数组中
export const isIndexOfStr = (typeArr,type)=>{
    let exist = false;
    type = (type + "").toLowerCase();
    for(let i = 0; i < typeArr.length; i++){
        if(typeArr[i] == type){
            exist = true;
            return true;
        }
    }
    return exist;
}
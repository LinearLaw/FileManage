/**
 * @desc 调整页面高度
 */
export const adjustPageHeight = function(){
    let h = window.innerHeight;
    let minHeight = 768;
    if(h<=minHeight){
        h = minHeight;
    }
    document.querySelector("#app").style.minHeight = `${h}px`;
}
/**
 * @desc 获取window的高度
 */
export const getWindowHeight = function (){
    return window.innerHeight;
}
/**
 * @desc 获取当前屏幕的高度
 */
export const getScreenHeight =function (){
    let clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight){
        clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }else{
        clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    return clientHeight;
}

/**
 * @desc 获取元素到顶部的距离
 */
export const  getElementTop = function(el){
    if(el.parentElement) {
        return this.getElementTop(el.parentElement) + el.offsetTop
    }
    return el.offsetTop
}

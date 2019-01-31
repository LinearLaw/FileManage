<template>
    <div class="index_page">
        <div class="file_dir">
            <h3 class="current_path" >{{currentPath.display}}</h3>
        </div>
        <div class="file_list">
            <ul>
                <li class='file_item' v-for="(item,index) in list">
                    <div v-if="name.isFile == true">
                        <span class="file_item_name file_is_file" :data-dir="item.rawPath">{{item.name.fileName}}</span>
                        <span class="file_item_down">
                            <a :href="item.path" :download="item.name.fileName" target="_blank">下载</a>
                        </span>
                    </div>
                    <div v-else>
                        <span class="file_item_name file_is_folder link_to_folder cursor_pointer" :data-dir="item.rawPath">{{item.name.fileName}}</span>
                        
                    </div>
                </li>
            </ul>
        </div>

    </div>

</template>

<script>
    import {getFileList} from '@/assets/server/file_service.js'
    export default {
        name:"index",
        data:()=>{
            return {
                dir:'/',
                currentPath:{
                    display:'/',
                    value:'/'
                },
                list:[]
            }
        },
        mounted(){
            this.getList();
        },

        methods:{
            // 获取当前url下的上一层url
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
            // 字符串去重，生成新链接
            removeMultiple(str){
                let arr = str.split("/");
                let newStr = "";
                let newUrl = "";
                let newArr = [];
                arr.map(function(item,index){
                    if(item){
                        newStr += "/" + item;
                        newUrl += `/<span class="link_to_folder cursor_pointer" data-dir="${newStr}">${item}</span>`;
                    }
                });
                return {dir:newStr,url:newUrl};
            },
            async getList(){
                const _this = this;
                let sendObj = this.removeMultiple(_this.dir);
                try{
                    let res = await getFileList({ body:{ dir:sendObj.dir } });
                    this.currentPath.display = sendObj.url?sendObj.url:'/';
                    this.currentPath.value = res.basePath?res.basePath:'/';

                    let newList = res.data.map((item,index)=>{
                        return {
                            name:item,
                            rawPath:`${res.basePath}/${item.fileName}`,
                            path:`${res.hostName}${res.basePath}/${item.fileName}`
                        }
                    });
                    this.list = newList;
                    console.log(this.list);
                }catch(err){
                    console.log(err);
                }


            }
        }
    }
</script>

<style lang="less" scoped>
    .index_page{
        padding:15px;
    }
</style>
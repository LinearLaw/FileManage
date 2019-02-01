<template>
    <div class="index_page">
        <!-- 标题路径 -->
        <div class="file_dir">
            <h3 class="current_path" >
                <span class="title_folder pointer" @click="enterFolder('/')">/</span>
                <span class="title_folder pointer"
                    v-for="(item,index) in currentPath.display" 
                    @click="enterFolderFromTitle(index)">/{{item}}</span>
            </h3>
        </div>
        <!-- 文件列表 -->
        <div class="file_list">
            <ul>
                <li class='file_item pointer' v-for="(item,index) in list">
                    <div v-if="item.name.isFile == true">
                        <span class="file_item_name file_is_file" :data-dir="item.rawPath">【 File 】{{item.name.fileName}}</span>
                        <a class='download_btn' :href="item.path" :download="item.name.fileName" target="_blank">
                            <button>下载</button>
                        </a>
                    </div>
                    <div v-else>
                        <span class="file_item_name file_is_folder pointer" @click="enterFolder(item.rawPath)" :data-dir="item.rawPath">【 Folder 】{{item.name.fileName}}</span>
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
                    display:[],
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
                let newArr = [];
                arr.map(function(item,index){
                    if(item){
                        newStr += "/" + item;
                        newArr.push(item)
                    }
                });
                return {dir:newStr,url:newArr};
            },
            // 点击标题某一项进入指定文件夹
            enterFolderFromTitle(index){
                let str = '';
                this.currentPath.display.map((item,_in)=>{
                    if(_in>index){
                        return;
                    }
                    str += `/${item}`;
                });
                this.dir = str;
                this.getList();
            },
            // 点击文件夹进入文件夹内
            enterFolder(dir){
                this.dir = dir;
                this.getList();
            },
            async getList(){
                const _this = this;
                let sendObj = this.removeMultiple(_this.dir);
                try{
                    let res = await getFileList({ body:{ dir:sendObj.dir } });

                    this.currentPath.display = sendObj.url;
                    this.currentPath.value = res.data.basePath?res.data.basePath:'/';

                    let newList = res.data.list.map((item,index)=>{
                        return {
                            name:item,
                            rawPath:`${res.data.basePath}/${item.fileName}`,
                            path:`${res.data.hostName}${res.data.basePath}/${item.fileName}`
                        }
                    });
                    this.list = newList;
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

    .file_dir{
        padding:5px;
        border-bottom:1px solid #e2e2e1;
        .title_folder{
            padding:5px ;
            font-size:16px;
            background:#cecece;
            border-radius:4px;
            margin:0 5px;
        }
    }
    .file_list{
        padding:10px;
        .file_item{
            margin:4px 0;
            padding:4px 0;
            border-radius:4px;
            &:hover{
                background:#e2e2e1;
                .file_is_folder{
                    color:red;
                }
            }
            
        }
    }
</style>
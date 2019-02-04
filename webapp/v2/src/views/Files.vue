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
        <div class="mg_t10 get_current_path">
            <el-button class="" @click="enterPreview">返回上一级</el-button>
            <el-button class="" @click='getAllFileLinks'>获取当前所有文件链接</el-button>
        </div>
        <!-- 文件列表 -->
        <div class="mg_t10 file_list" v-loading="listLoading">
            <ul>
                <!-- 文件夹 -->
                <li class='file_item pointer' v-for="(item,index) in list" v-if="item.name.isFile != true" @click="enterFolder(item.rawPath)">
                    <span class="file_item_name file_is_folder pointer"  :data-dir="item.rawPath">
                        <i class="fa fa-folder-open" aria-hidden="true"></i> {{item.name.fileName}}
                    </span>
                </li>
                <!-- 文件 -->
                <li class='file_item pointer' v-for="(item,index) in list" v-if="item.name.isFile == true">
                    <span class="file_item_name file_is_file" :data-dir="item.rawPath">
                        <i class="fa fa-file" aria-hidden="true"></i> {{item.name.fileName}}
                    </span>
                    <a class='download_btn' :href="item.path" :download="item.name.fileName" target="_blank">
                        <el-button type="primary" round>下载</el-button>
                    </a>
                </li>
                <li class="text_info" v-if='list.length<=0'>
                    空文件夹
                </li>
            </ul>
        </div>

        <FileDialog></FileDialog>
    </div>
</template>

<script>

    import {mapState,mapMutations} from 'vuex'
    import FileDialog from './CommonCpn/FileLinkDialog.vue'
    import {getFileList} from '@/assets/server/file_service.js'
    export default {
        name:"index",
        components:{ FileDialog },

        data:()=>{
            return {
                dir:'/',
                currentPath:{
                    display:[],
                    value:'/'
                },
                list:[],
                listLoading:false,
            }
        },
        mounted(){
            this.getList();
        },
        computed:{
            ...mapState('links',['dialog']),
        },
        methods:{
            ...mapMutations('links',['showDialog','renderText']),
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
            // 打开弹出框，获取所有的文件链接
            getAllFileLinks(){
                const _this = this;
                let str = "";
                
                _this.list.map((item,index)=>{
                    if(item.name.isFile == true){
                        str = `${str}${item.path}\n`;
                    }
                });
                this.renderText(`${str?str:'当前目录下无可下载文件'}`);
                this.showDialog(true);
            },
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

            // 1、点击标题某一项进入指定文件夹
            enterFolderFromTitle(index){
                if(this.listLoading == true){ return; }
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
            // 2、点击文件夹进入文件夹内
            enterFolder(dir){
                if(this.listLoading == true){ return; }

                this.dir = dir;
                this.getList();
            },
            // 3、返回上一级
            enterPreview(){
                if(this.listLoading == true){ return; }

                let curr = this.currentPath.value;
                let prev = this.previewDir(curr);
                this.dir = prev;
                this.getList();
            },
            async getList(){
                const _this = this;
                let sendObj = this.removeMultiple(_this.dir);
                try{
                    this.listLoading = true;
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
                    this.listLoading = false;

                }catch(err){
                    console.log(err);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .index_page{
        width:100%;
        height:100%;
        overflow:hidden;
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
        width:100%;
        height:calc(100% - 100px);
        overflow:auto;
        padding:10px;
        margin-bottom:10px;
        border:1px solid #e2e2e1;
        border-radius:10px;
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
            .fa-folder-open{
                color:#EABB23;
            }
            .fa-file{

            }
            
        }
    }
</style>
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
                <li class='file_item pointer' v-for="(item,index) in list" v-if="item.fileInfo.isFile != true" @click="enterFolder(item.rawPath)">
                    <span class="file_item_name file_is_folder pointer"  :data-dir="item.rawPath">
                        <i class="fa fa-folder-open" aria-hidden="true"></i> {{item.fileInfo.fileName}}
                    </span>
                </li>
                <!-- 文件 -->
                <li class='file_item pointer' v-for="(item,index) in list" v-if="item.fileInfo.isFile == true">
                    <span class="file_item_name file_is_file" :data-dir="item.rawPath">
                        <i class="fa fa-file" aria-hidden="true"></i> {{item.fileInfo.fileName}}
                    </span>
                    <div class='file_item_right fr'>
                        <span class='file_item_size'>{{item.fileInfo.size}}</span>
                        <a class='download_btn' :href="item.path" :download="item.fileInfo.fileName" target="_blank">
                            <el-button type="primary" round><i class="fa fa-arrow-down" aria-hidden="true"></i></el-button>
                        </a>
                        <div class='open_file'>
                            <el-dropdown trigger="click" @command="handleCommand(index,$event)">
                                <span class="el-dropdown-link">
                                    <el-button round :loading='item.loading'>
                                        <i class="fa fa-ellipsis-h" v-show='!item.loading' aria-hidden="true"></i>
                                    </el-button>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command='text' v-if='item.fileInfo.isImg != true && item.fileInfo.isVideo != true'>以文本方式查看</el-dropdown-item>
                                    <el-dropdown-item command='img' v-if='item.fileInfo.isImg == true'>查看图片</el-dropdown-item>
                                    <el-dropdown-item command='video'  v-if='item.fileInfo.isVideo == true'>查看视频</el-dropdown-item>
                                    <!-- <el-dropdown-item command='audio'>查看音频</el-dropdown-item> -->
                                    <!-- <el-dropdown-item command='pdf'>查看PDF</el-dropdown-item> -->
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </li>
                <li class="text_info" v-if='list.length<=0'>
                    空文件夹
                </li>
            </ul>
        </div>

        <FileDialog></FileDialog>

        <!-- 查看图片 -->
        <ReadImg v-if='readImg.isShow' @close='readDialogClose' :imgList='readImg.arr' :initialIndex='readImg.index'></ReadImg>
        <!-- 查看文本 -->
        <ReadTxt v-if='readTxt.isShow' @close='readDialogClose' :textInfo='readTxt'></ReadTxt>
        <!-- 查看视频 -->
        <ReadVideo v-if='readVideoCtrl.isShow' @close='readDialogClose' :videoObj='readVideoCtrl'></ReadVideo>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import {getFileList, getFileContent} from '@/assets/server/file_service.js'
    import _utils from '@/assets/utils/utils.js';

    import FileDialog from '../CommonCpn/FileLinkDialog.vue'
    import ReadImg from './Component/ReadImg.vue'
    import ReadTxt from './Component/ReadTxt.vue'
    import ReadVideo from './Component/ReadVideo.vue'

    export default {
        name:"index",
        components:{ FileDialog, ReadImg, ReadTxt, ReadVideo },

        data:()=>{
            return {
                dir:'/',
                currentPath:{
                    display:[],
                    value:'/'
                },
                list:[],
                listLoading:false,

                type:{
                    imgType:['jpg','jpeg','png','gif','bmp'],
                    videoType:['mp4','avi','rmvb','3gp','mov','flv'],
                },
                readImg:{
                    isShow:false,
                    arr:[],
                    index:0
                },
                readTxt:{
                    isShow:false,
                    text:'',
                    name:'',
                    dir:''
                },
                readVideoCtrl:{
                    isShow:false,
                    src:'',
                    name:''
                }
            }
        },
        mounted(){
            if(this.$route.query.dir){
                this.dir = this.$route.query.dir;
            }
            this.getList();
        },
        computed:{
            ...mapState('links',['dialog']),
        },
        methods:{
            ...mapMutations('links',['showDialog','renderText']),
            
            //1、文件下拉菜单分发
            handleCommand(index,command){
                if(command == 'img'){
                    this.readPic(index);
                }else if(command == 'text'){
                    this.readText(index);
                }else if(command == 'video'){
                    this.readMp4(index);
                }
            },
            //1.1、查看图片，打开图片窗口
            readPic(index){
                let _this = this;
                let imgArr = [];
                let initialIndex = 0;
                this.list.map((_it,_in)=>{
                    if(_it.fileInfo.isFile == true){
                        if(_it.fileInfo.isImg == true){
                            if(_in == index){
                                initialIndex = imgArr.length;
                            }
                            imgArr.push(_it);
                        }
                    }
                });
                this.readImg.arr = imgArr;
                this.readImg.index = initialIndex;
                this.readImg.isShow = true;
            },
            readDialogClose(){
                this.readImg.isShow = false;
                this.readTxt.isShow = false;
                this.readVideoCtrl.isShow = false;
            },
            // 1.2、查看文本
            async readText(index){
                const _this = this;
                try{
                    this.list[index]['loading'] = true;
                    let res = await getFileContent({dir:_this.list[index]['rawPath']});
                    this.list[index]['loading'] = false;
                    
                    if(res.data.code == 200){
                        this.readTxt.text = res.data.content;
                        this.readTxt.isShow = true;
                        this.readTxt.name = this.list[index]['fileInfo']['fileName'];
                        this.readTxt.dir = this.list[index]['path'];
                    }else{
                        this.$message.error(`${res.data.msg}`);
                    }
                }catch(err){
                    console.log(err);
                    this.$message.error(`${err}`);
                    this.list[index]['loading'] = false;
                }
            },
            // 1.3、查看视频
            readMp4(index){
                const _this = this;
                this.readVideoCtrl.src = this.list[index]['path'];
                this.readVideoCtrl.name = this.list[index]['fileInfo']['fileName'];
                this.readVideoCtrl.isShow = true;
            },

            // 0、打开弹出框，获取所有的文件链接
            getAllFileLinks(){
                const _this = this;
                let str = "";
                _this.list.map((item,index)=>{
                    if(item.fileInfo.isFile == true){
                        str = `${str}${item.path}\n`;
                    }
                });
                this.renderText(`${str?str:'当前目录下无可下载文件'}`);
                this.showDialog(true);
            },
            // -1、点击标题某一项进入指定文件夹
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
            // -2、点击文件夹进入文件夹内
            enterFolder(dir){
                if(this.listLoading == true){ return; }

                this.dir = dir;
                this.getList();
            },
            // -3、返回上一级
            enterPreview(){
                if(this.listLoading == true){ return; }

                let curr = this.currentPath.value;
                let prev = _utils.url.previewDir(curr);
                this.dir = prev;
                this.getList();
            },
            async getList(){
                const _this = this;
                let sendObj = _utils.url.removeMultiple(_this.dir);
                try{
                    this.listLoading = true;
                    let res = await getFileList({ dir:sendObj.dir });

                    this.currentPath.display = sendObj.url;
                    this.currentPath.value = res.data.basePath?res.data.basePath:'/';
                    let imgArr = [];
                    let newList = res.data.list.map((item,index)=>{
                        item['isImg'] = _utils.basic.isIndexOfStr(_this.type.imgType,item.type);
                        item['isVideo'] = _utils.basic.isIndexOfStr(_this.type.videoType,item.type);
                        return {
                            fileInfo:item,
                            rawPath:`${res.data.basePath}/${item.fileName}`,
                            path:`${res.data.hostName}${res.data.basePath}/${item.fileName}`,
                            loading:false
                        }
                    });
                    this.list = newList;
                    this.listLoading = false;
                    this.$router.push({name:'Index',query:{dir:_this.dir}});
                }catch(err){
                    console.log(err);
                    this.listLoading = false;
                    this.$message.error(`${err}`);
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
            .file_item_size{
                font-size:12px;
                display: inline-block;
                margin:0 10px;
            }
            
        }
    }
    .open_file{
        width:40px;
        width:40px;
        text-align:center;
        display:inline-block;
    }
</style>
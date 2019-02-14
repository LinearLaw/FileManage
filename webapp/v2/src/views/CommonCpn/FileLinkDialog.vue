<template>
    <el-dialog title="复制以下链接，打开迅雷，创建下载任务"
        :visible.sync="dialog.visible"
        width="50%">
        <div class="main_dialog_content">
            <textarea v-model='dialog.string' type="text" id="allLinks" style="width:100%;height:auto;min-height:150px;padding:10px;"></textarea>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="showDialog(false)">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

    import {mapState,mapMutations} from 'vuex'
    export default {
        name:"index",
        data:()=>{
            return {
                
            }
        },
        mounted(){

        },
        computed:{
            ...mapState('links',['dialog'])
        },
        methods:{
            ...mapMutations('links',['showDialog','renderText']),
            
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
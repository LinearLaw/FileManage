<template>
    <div class='read_text shadow'>
        <div class='text_box'>
            <h3>
                <span class='file_name'>{{textInfo.name}}</span>
                <div class='operate_line fr'>
                    <a class='text_download pointer' :href='textInfo.dir' :download='textInfo.name' target="_blank">
                        <i class="fa fa-arrow-down " aria-hidden="true"></i>
                    </a>
                    <span class='text_download pointer' @click='close'>
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </span>
                </div>
            </h3>
            <textarea v-model='textInfo.text' name="" id="" cols="30" rows="10" disabled></textarea>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        textInfo:{
            type:Object,
            default:()=>{}
        }
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
}
</script>
<style lang='less' scoped>
    .read_text{
        padding:100px;
    }
    .text_box{
        width:100%;
        height:100%;
        border-radius:10px;
        padding-top:35px;
        overflow: hidden;
        position:relative;
        h3{
            color:#fff;
            font-weight:500;
            width:100%;
            position:absolute;
            top:0;
            left:0;
            background:#9e9e9e;
            .file_name{
                padding:5px;
                display:inline-block;
            }
        }
        .operate_line{
            margin-right:5px;
        }
        .text_download{
            line-height:35px;
            padding:0 10px;
            border:1px solid #cecece;
            color:#fff;
            &:first-child{ 
                border-bottom-left-radius: 8px;
                border-top-left-radius: 8px;
            }
            &:last-child{
                border-bottom-right-radius: 8px;
                border-top-right-radius: 8px;
            }
            &:hover{ background:#409EFF; }
            &:active{ background: #409EFF;}
        }
        textarea{
            width:100%;
            height:100%;
            padding:10px 10px;
            resize: none;
            font-size:14px;
        }
    }
</style>

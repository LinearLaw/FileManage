<template>
    <div class='read_text shadow'>
        <i class="fa fa-times shadow_close pointer" @click='close' aria-hidden="true"></i>
        <div class='text_box'>
            <h3>
                {{textInfo.name}}
                <a class='text_download fr pointer' :href='textInfo.path' :download='textInfo.name' target="_blank">
                    <i class="fa fa-arrow-down " aria-hidden="true"></i>
                </a>
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
            padding:5px;
            width:100%;
            position:absolute;
            top:0;
            left:0;
            background:#9e9e9e;
        }
        .text_download{
            line-height:25px;
            padding:0 10px;
            border-radius:8px;
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

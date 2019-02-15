<template>
    <div class='read_img shadow'>
        <i class="fa fa-times shadow_close pointer" @click='close' aria-hidden="true"></i>
        <el-carousel class='img_carousel' height='100%' :autoplay='false' arrow="always" :initial-index='initialIndex' indicator-position='none'>
            <el-carousel-item v-for="(item,index) in imgList" :key="index">
                <div class="carousel_item">
                    <img :src="item.path" :alt="item.fileInfo.fileName">
                    <h3>第{{index + 1}}张： {{item.fileInfo.fileName}}</h3>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    props:{
        imgList:{
            type:Array,
            default:()=>[]
        },
        initialIndex:0
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
}
</script>
<style lang='less' scoped>
    .read_img{
        
        .img_carousel{
            width:100%;
            height:100%;
        }
        .carousel_item{
            width:100%;
            height:100%;
            text-align:center;
            padding:50px 100px;
            color:#fff;
            position:relative;
            img{
                max-width:100%;
                max-height:100%;
                width:auto;
                height:auto;
                line-height:100%;
                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }
            h3{
                font-weight:500;
                position:absolute;
                bottom:20px;
                left:50%;
                transform:translate(-50%,0);
            }
        }
    }
</style>

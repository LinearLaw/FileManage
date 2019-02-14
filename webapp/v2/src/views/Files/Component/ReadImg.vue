<template>
    <div class='read_img'>
        <i class="fa fa-times close_read_img pointer" @click='close' aria-hidden="true"></i>
        <el-carousel class='img_carousel' height='100%' :autoplay='false' arrow="always" :initial-index='initialIndex' indicator-position='none'>
            <el-carousel-item v-for="(item,index) in imgList" :key="index">
                <div class="carousel_item">
                    <img :src="item.path" :alt="item.fileInfo.fileName">
                    <h3>{{item.fileInfo.fileName}}</h3>
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
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.6);
        position:fixed;
        top:0;
        left:0;
        z-index:100;
        .img_carousel{
            width:100%;
            height:100%;
        }
        .close_read_img{
            position:absolute;
            right:30px;
            top:30px;
            font-size:30px;
            color:#fff;
            z-index: 50;
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
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
            }
            h3{
                font-weight:500;
                position:absolute;
                bottom:40px;
                left:50%;
                transform:translate(-50%,0);
            }
        }
    }
</style>

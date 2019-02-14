<template>
    <div class='read_img'>
        <el-carousel :interval="5000" arrow="always" :initial-index='initialIndex'>
            <el-carousel-item v-for="(item,index) in imgList" :key="index">
                <img src="" alt="">
                <h3></h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    props:{
        imgList:{
            type:Array,
            default:[]
        },
        initialIndex:0
    }
}
</script>
<style lang='less' scoped>

</style>

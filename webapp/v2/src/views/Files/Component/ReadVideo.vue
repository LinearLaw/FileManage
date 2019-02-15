<template>
    <div class='read_video shadow'>
        <i class="fa fa-times shadow_close pointer" @click='close' aria-hidden="true"></i>
        <div class='video_main'>
            <video id="videoObj" class="video-js vjs-default-skin" controls preload="none" poster="">
                <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
            </video>
        </div>

    </div>
</template>
<script>
export default {
    props:{
        videoObj:{
            type:Object,
            default:()=>{}
        }
    },
    mounted(){
        console.log(window.videojs);
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
}
</script>
<style lang='less' scoped>

</style>

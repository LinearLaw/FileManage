<template>
    <div class='read_video shadow'>
        <span class='video_name'>{{videoObj.name}}</span>
        <i class="fa fa-times shadow_close pointer" @click='close' aria-hidden="true"></i>
        <div class='video_main' id='videoBox'>
            <video id="videoObj" class="video-js vjs-default-skin" controls preload="auto" poster="">
                <source :src="videoObj.src" type="video/mp4">
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
    data(){
        return {
            videoOptions:{
                playbackRates: [0.7, 0.9, 1, 1.1, 1.2, 1.3, 1.5, 2],
                src:''
            },
            player:null,
            keyCtrl:{
                playCtrl:false,
                interval:3, // 按键左右前进后退单次作用时间间隔，前进x s或后退x s
            },
            videoTpl:`<video id="videoObj" class="video-js vjs-default-skin" controls preload="auto" poster="">
                <source src='' type="video/mp4" class='video_source'>
            </video>`
        }
    },
    mounted(){
        const _this = this;
        this.videoOptions.src = this.videoObj['src'];
        document.onkeydown = null;
        this.initPlayer();
    },
    methods:{
        close(){
            this.player && this.player.pause();
            document.onkeydown = null;
            this.$emit('close');
        },
        initPlayer(){
            const _this = this;
            let videoClass = window.videojs.getPlayers()['videoObj'];
            if(videoClass){ 
                videoClass.dispose(); // 销毁原有实例
            }
            this.player = window.videojs('videoObj',_this.videoOptions);
            document.onkeydown = function(e) {
                if(_this.keyCtrl.playCtrl == true){
                    return;
                }
                if(!_this.player){
                    return;
                }
                let key = window.event.keyCode;
                _this.keyCtrl.playCtrl = true;
                _this.timeoutOffCtrl();
                if (key == 32) { // 空格键
                    _this.controlPlay();
                }else if(key == 39){ // 右方向键
                    _this.goOrBack(true);
                }else if(key == 37){ // 左方向键
                    _this.goOrBack(false);
                }
            }
        },
        controlPlay(){
            if(this.player.paused()){
                this.player.play();
            }else{
                this.player.pause();
            }
        },
        goOrBack(bool){
            const _this = this;
            let ct = this.player.currentTime();
            let du = this.player.duration();
            let interval = this.keyCtrl.interval;
            let target = bool?ct+interval : ct-interval;
            if(bool){
                this.player.currentTime(target>du?du:target);
            }else{
                this.player.currentTime(target<=0?0:target);
            }
            
        },
        timeoutOffCtrl(){
            const _this = this;
            setTimeout(()=>{
                _this.keyCtrl.playCtrl = false;
            },500)
        }
    }
}
</script>
<style lang='less'>
    .read_video{
        padding:50px 100px;
        position:relative;
        .video_name{
            position:absolute;
            top:10px;
            left:100px;
            color:#fff;
        }
        .video_main{
            width:100%;
            height:100%;
            position:relative;
            #videoObj{
                width:100%;
                height:100%;
            }
            .vjs-big-play-button{
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
                border-radius:50%;
                width:100px;
                height:100px;
                line-height:100px;
                font-size:50px;
            }
            .vjs-menu-button-popup .vjs-menu .vjs-menu-content{
                max-height:300px;
            }
        }
    }
</style>

<template>
  <div id="app">
  
    <MenuLeft></MenuLeft>
    <MenuTop></MenuTop>

    <router-view></router-view>
  </div>
</template>

<script>

  import MenuLeft from '@/views/CommonCpn/MenuLeft.vue'
  import MenuTop from '@/views/CommonCpn/MenuTop.vue'
  export default {
    components:{
      MenuTop,
      MenuLeft
    }
  }
</script>
<style lang="less">
  
  #app{
    padding-left:300px;
    padding-top:100px;
    position:relative;
    width:100%;
    height:100%;
  }
</style>

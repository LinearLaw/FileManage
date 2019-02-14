<template>
    <div class="menu_left">
        <div class="header_logo">
            <router-link :to="{'name':'Index'}">
                <img class="header_logo_pic" src="" alt="">
            </router-link>
        </div>
        <div class="menu_bar">
            <div class="menu_bar_group" v-for='(item,index) in menuList' :class="{'active':item.isShow}" >
                <div class="menu_bar_title pointer" @click="openGroup(index)">
                    <span>{{item.name}}</span>
                    <span class="menu_icons el-icon-caret-bottom"></span>
                </div>
                <ul class="menu_bar_children">
                    <li class="menu_bar_item pointer" v-for="(_item,_index) in item.children" :class="{'active':_item.link==$route.name}">
                        <router-link :to="{'name':_item.link}">
                            <div class="menu_link">
                                <span class="menu_bar_icon" :class="[_item.icon]">{{_item.name}}</span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>  
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                menuList:[
                    {
                        name:"盘符",
                        isShow:false,
                        children:[
                            {
                                name:"C:/",
                                icon:"fa fa-suitcase",
                                link:"Index"
                            },
                            {
                                name:"D:/",
                                icon:"fa fa-suitcase",
                                link:"Index"
                            },
                            {
                                name:"E:/",
                                icon:"fa fa-suitcase",
                                link:"Index"
                            },
                            {
                                name:"F:/",
                                icon:"fa fa-suitcase",
                                link:"Index"
                            }
                        ]
                    },
                    // {
                    //     name:'图片抓取',
                    //     isShow:false,
                    //     children:[
                    //         {
                    //             name:'图片查看',
                    //             icon:'fa fa-picture-o',
                    //             link:'ViewPic'
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        methods:{
            openGroup(index){
                let i = this.menuList[index]["isShow"];
                this.menuList[index]["isShow"] = !i;
            }
        }
    }
</script>

<style lang="less" scoped>
    .menu_left{
        width:300px;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        background:#e2e2e1;
        padding-top:100px;
    }
    .menu_bar{
        padding:20px 15px;
        text-align:left;
        border-top:1px solid #e2e2e1;
        .menu_bar_group{
            .menu_bar_children{
                overflow:hidden;
                transition:all 0.5s;
                height:0px;
            }
            &.active{
                .menu_bar_title .menu_icons{
                    transform:rotate(180deg);
                }
                .menu_bar_children{
                    height:auto;
                }
            }
            .menu_bar_title,.menu_bar_item{
                font-size:14px;
            }
            .menu_bar_title{
                transition:all 0.5s;
                padding:10px 15px;
                color:#666;
                .menu_icons{
                    transform:rotate(0deg);
                }
                &:hover{
                    color:#6567d4;
                }
            }
            
        }
    }

    .menu_bar_item{
        margin-bottom:10px;
        .menu_link{
            position:relative;
            color:#666;
            padding:10px 0;
            padding-left:50px;
            &:hover{
                background:#6567d4;
                color:#fff;
                border-radius:40px;
            }
        }
        .menu_bar_icon:before{
            display:inline-block;
            position:absolute;
            left:20px;
            top:50%;
            transform:translateY(-50%);
            vertical-align:middle;
        }
        
    }
</style>
<template>
    <div class='view_pic'>
        <el-dialog title="请输入目标地址" :visible.sync="dialog.visible" width="50%" center :show-close='false'>
            <div class="main_dialog_content">
                <ul>
                    <li class='dialog_input_item'>
                        <p class='dialog_input_label'>请选择地址层级</p>
                        <el-radio v-model="dialog.linkLevel" label="1">一级地址</el-radio>
                        <el-radio v-model="dialog.linkLevel" label="2">两级地址</el-radio>
                    </li>
                    <li class='dialog_input_item'>
                        <p class='dialog_input_label'>一级地址链接</p>
                        <el-input v-model="dialog.level1Links" placeholder="请输入链接"></el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="start">确 定</el-button>
            </span>
        </el-dialog>
        
        <div class='link_content'>
            <div class='open_dialog'>
                <el-button type="primary" @click="open">输入目标地址</el-button>
            </div>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item :title="index+''" v-for='(item,index) in list' :name="index" :key="index">
                    <div class='mg_t10 mg_b10' v-for='(_it,_in) in item.img'>
                        <img :src='_it' />
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>

import {getImgList,getImgList2} from '@/assets/server/img_service.js'
export default {
    data:()=>{
        return {
            dialog:{
                visible:true,
                linkLevel:'1',
                level1Links:''
            },
            list:[],
            activeNames: ['1'],
            inter:''  /* 计时器 */
        }
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        open(){
            this.list = [];
            this.activeNames = [];
            this.dialog.visible = true;
        },
        start(){
            const _this = this;
            this.dialog.visible = false;
            if(this.dialog.linkLevel == '1'){
                this.list = [{img:[]}];
                this.level_1(0,_this.dialog.level1Links);
            }else{
                this.level_2();
            }
        },
        async level_1(index,url){
            const _this = this;
            let send = { url:url }
            try{
                let res = await getImgList(send);
                this.activeNames = ['1'];
                this.list[index]['img'] = res.data.img;
            }catch(err){
                console.log(err)
            }
        },
        async level_2(){
            const _this = this;
            let send = {
                url:_this.dialog.level1Links
            }
            try{
                let res = await getImgList2(send);
                this.activeNames = ['1'];
                this.list = res.data.img.map((item,index)=>{
                    return {
                        origin:item,
                        img:[]
                    }
                });
                this.renderLevel_2();
                console.log(this.list);
            }catch(err){
                console.log(err)
            }
        },
        renderLevel_2(){
            const _this = this;
            this.list.map((item,index)=>{
                (function(ind,it){
                    setTimeout(()=>{
                        _this.level_1(ind,it);
                    },500)
                })(index,item.origin)
            })
        }
    }
}
</script>

<style lang='less' scoped>
    .link_content{
        padding:10px;
    }
</style>
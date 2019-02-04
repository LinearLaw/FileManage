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
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="反馈 Feedback" name="1">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="反馈 Feedback" name="2">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
export default {
    data:()=>{
        return {
            dialog:{
                visible:true,
                linkLevel:'1',
                level1Links:''
            },
            list:[],
            activeNames: ['1','2']
        }
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },

        start(){
            this.dialog.visible = false;
            if(this.dialog.linkLevel == '1'){
                this.level_1();
            }else{
                this.level_2();
            }
        },
        level_1(){

        },
        level_2(){

        },
        renderLevel_2(){
            
        }
    }
}
</script>
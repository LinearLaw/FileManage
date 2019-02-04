const state = {
    dialog:{
        visible:false,
        string:""
    },
}
const getters = {
    
}

const actions = {
    async uploadOcrPic({commit,state},payload){
        
    }
}

const mutations = {
    showDialog(state,bool){
        state.dialog.visible = bool;
    },
    renderText(state,item){
        state.dialog.string = item;
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
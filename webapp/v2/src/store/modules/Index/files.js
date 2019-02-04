const state = {
    list:[],
}
const getters = {
    
}

const actions = {
    async uploadOcrPic({commit,state},payload){
        
    }
}

const mutations = {
    renderList(state,item){
        state.list = item;
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
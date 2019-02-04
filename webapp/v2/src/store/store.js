import Vue from 'vue'
import Vuex from 'vuex'

import links from './modules/Index/links'
import files from './modules/Index/files'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
      links,
      files
  }
})
